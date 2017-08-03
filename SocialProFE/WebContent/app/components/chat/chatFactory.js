var chat = angular.module('chatModule',[]);

chat.factory('chatFactory',['$http','$q',function($http,$q){
	
	var service = {};
	var listener = $q.defer();
	var socket = {
			client : null,
			stomp : null
	};
	
	
	service.RECONNECT_TIMEOUT = 30000;
	service.SOCKET_URL = "http://localhost:8081/SocialProBE/chat";
	service.CHAT_TOPIC = "/topic/message";
	service.CHAT_BROKER = "/app/chat";
	
	service.send = sendMessage;
	service.receive = receive;
	
	// The only this function does is returning the deferred used to send Message at.
	// This receive method will call from chatController
	function receive() {
		console.log('In the receive!');
		console.log('listener.promise:'+listener.promise);
		return listener.promise;
	};
	
	// send Message as a JSON Object and generates id
	// This method call from chat controller
	function sendMessage(message) {
		console.log('In the send!');
		// send(destination, {},//body);
		socket.stomp.send(service.CHAT_BROKER,{
			priority : 9
		},JSON.stringify({
			message : message
		}));
	}
	
	// when the connection to the websocket is lost, it will call the reconnect() function
	// which will attempt to initialize the connection again after 30 seconds.
	var reconnect = function() {
		
		$timeout(function() {
			initialize();
		},this.RECONNECT_TIMEOUT);
	};
	
	// it will translate the websocket data body to model required by the controller
	var getMessage = function(data) {
		
		console.log('In the GetMessage!');
		var message = JSON.parse(data);
		var out = {};
		out.message = message.message;
		out.time = new Date(message.time);
		return out;
	};
	
	// it will listen to the /topic/message topic on which all message will be received
	var startListener  = function() {
		console.log('Starting the Listner!');
		socket.stomp.subscribe(service.CHAT_TOPIC,function(data) {
			listener.notify(getMessage(data.body));
			// it will then send data to the deferred which will be used by the controllers
		});
	};
	
	// this is done for setting up the service
	var initialize = function() {
		
		console.log('Initialize Function!');
		socket.client = new SockJS(service.SOCKET_URL);
		socket.stomp = Stomp.over(socket.client);
		socket.stomp.connect({},startListener);
		socket.stomp.onclose = reconnect;
		// it will set up the sockJs websocket client and use it for the stomp.js websockket client.
	}
	
	initialize();
	
	return service;
	
}]);