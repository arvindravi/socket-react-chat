/** @jsx React.DOM */
var Chat = React.createClass({
	render: function() {
		return (
			<div className="container">
				<ChatArea />
				<InputBox />
			</div>
		);
	}
});

var Message = React.createClass({
	render: function() {
		var nick = this.props.nick;
		var message = this.props.message;
		return (
			<div className="message">
				<li key={message.id}>	
					<b>{nick}</b>: {message}
				</li>
			</div>
		);
	}
});

var Status = React.createClass({
	render: function() {
		var nick = this.props.nick;
		console.log(nick);
	}
});

var ChatArea = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		var socket = io();
		var self = this;
		socket.on('chat message', function(data) {
			self.state.data.push(data);
			self.setState({data: self.state.data});
		});
	},
	render: function() {
		var chatNodes = this.state.data.map(function(data) {
			return (
				<Message nick={data.nick} message={data.message} />
			);
		});
		return (
			<div className="messages">
				{chatNodes}
			</div>
		);
	}
})

var InputBox = React.createClass({
	componentDidMount: function() {
		var name = prompt('Enter nickname: ');
		this.setState({nick: name});
	},
	handleSubmit: function(message) {
		var socket = io();
		var message = this.refs.message.getDOMNode().value.trim();
		var nick = this.state.nick;
		console.log(nick);
		if(!message) {
			return false;
		}
		var data = {nick: nick, message: message};
		socket.emit('message', data);
		this.refs.message.getDOMNode().value = '';
		return false;
	},
	render: function() {
		return (
			<div className="inputBox">
				<form className="inputForm" onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Enter message.." ref="message" />
					<input type="submit" value='Send' />
				</form>
			</div>
		);
	}
});

React.renderComponent(<Chat />, document.getElementById('chat'));