var friend = angular.module('friendModule',[]);

friend.factory('friendFactory',['$http','$q',function($http,$q){

	
	// For Linking with backend project
	var url = 'http://localhost:8081/SocialProBE/';
	
	return {
		
		fetchUsers : fetchUsers,
		sendRequest : sendRequest,
		fetchRequest : fetchRequest,
		approveRequest : approveRequest
		};
	
	
	// function to fetch users
	function fetchUsers() {
		debugger;
		
		var deferred = $q.defer();
		var userId = user.id;
		
		$http.get(url + '/user/friends/model/' + userId)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In friendFactory fetchUsers Response!');;
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In friendFactory fetchUsers errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
	// function to send friend request
	function sendRequest(id) {
		debugger;
		
		var deferred = $q.defer();
		var initId = user;
		
		$http.post(url + '/user/friendRequest/'+id, initId)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In friendFactory sendRequest Response!');;
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In friendFactory sendRequest errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	// function to fetch friend request
	function fetchRequest() {
		debugger;
		
		var deferred = $q.defer();
		var userId = user.id;
		
		$http.get(url + '/user/friendRequest/list/'+ userId)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In friendFactory fetchRequest Response!');;
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In friendFactory fetchRequest errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
	// function to approve friend request
	function approveRequest(id) {
		debugger;
		
		var deferred = $q.defer();
		var userId = user;
		
		$http.post(url + '/user/friendRequest/approve/'+id, userId)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In friendFactory approveRequest Response!');;
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In friendFactory approveRequest errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
}]);
