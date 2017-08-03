friend.controller('friendController',['friendFactory','$timeout','$cookies','$routeParams','$location','$route','$q', 
	function(friendFactory,$timeout,$cookies,$routeParams,$location,$route,$q){
	
	var self = this;
	
	// for storing the user list
	self.userlist = [];
	
	// for temporary storing list of user
	self.tempUsers = [];
	
	self.countUsers = {};
	
	self.hasSentRequest = false;
	
	// function to store list of friend requests
	self.friendRequests = [];
	
	self.myFriends = [];
	
	// To count Number of Friend request
	self.friendRequestsCount = [];
	
	//Calling jQuey once controller has loaded
	$timeout(function () {
		setting();
	},100);
	
	
	// function to fetch site users will come here
	self.fetchUsers = function() {
		debugger;
		
		friendFactory.fetchUsers()
			.then(function(user){
					self.userlist = user;
					self.countUsers = self.userlist.length;
					console.log('Sucessfully fetched Users List!');
				},
			function(errResponse){
					console.error('Failed to fech Users List!');
				}	
			);
	}
	
	// function to send friend Request
	self.sendRequest = function(id) {
		debugger;
		
		friendFactory.sendRequest(id)
			.then(function(friend){
				debugger;
				$route.reload();
				//self.hasSentRequest = true;
				Materialize.toast('Friend Request send Sucessfully!',2000);
				console.log('Friend Request send Sucessfully!');
				},
			function(errResponse){
					console.error('Failed to send Friend Request!');
				}	
			);
	}
	
	
	// function to fetch friend list
	self.fetchRequest = function() {
		debugger;
		
		friendFactory.fetchRequest()
			.then(function(friendRequests){
					self.friendRequests = friendRequests;
					self.friendRequestsCount = self.friendRequests.length;
					console.log('Sucessfully fetched Friend List!');
				},
			function(errResponse){
					console.error('Failed to fech Friend List!');
				}	
			);
	}
	
	// function to approve friend Request
	self.approveRequest = function(id) {
		debugger;
		
		friendFactory.approveRequest(id)
			.then(function(friendRequests){
				debugger;
				$route.reload();
				Materialize.toast('Friend Request Accepted Sucessfully!',2000);
				console.log('Friend Request Accepted Sucessfully!');
				},
			function(errResponse){
					console.error('Failed to Accept Friend Request!');
				}	
			);
	}
	
	
	
}]);