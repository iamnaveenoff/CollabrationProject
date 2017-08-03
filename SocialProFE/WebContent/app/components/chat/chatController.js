chat.controller('chatController',['chatFactory','$cookies','$rootScope','$route','$routeParams',
	function(chatFactory,$cookies,$rootScope,$route,$routeParams){
	
	
	var self = this;
	
	self.messages = [];
	self.message = " ";
	self.chatter = $routeParams.username;
	// we can set maximum size of character here as below
	//self.max = 100;
	
	self.addMessage = function() {
		chatFactory.send($rootScope.user.username + " :- " + self.message);
		self.message = " ";
		console.log('In chat Controller add Message!'+ self.message);
	};
	
	chatFactory.receive().then(null,null,function(message){
		console.log('In chat Controler receive Message!');
		self.messages.push(message); // this messages we have to display in html text area
	});
	
}]);