var request = angular.module('requestModule',[]);

request.factory('requestFactory',['$http','$q',function($http,$q){
	
	
	// For Linking to backend Project
	var url = 'http://localhost:8081/SocialProBE/';
	
	return {
		
		// fetch the pending user list
		pendingUserList : pendingUserList,
		
		//changing  status of the user
		changeStatus : changeStatus,
		
		
		// fetch the pending blog list
		pendingBlogList :pendingBlogList,
		
		// changing the status of the blog
		changeBlogStatus : changeBlogStatus,
		
		
		// fetch the pending forum list
		fetchForumRequests :fetchForumRequests,
		
		// changing the status of the forum
		changeFRStatus : changeFRStatus,
		
		
		// fetch the pending Event list
		pendingEventList :pendingEventList,
		
		// changing the status of the event
		approveEvent : approveEvent,
		
		// fetch the pending job list
		pendingJobList :pendingJobList,
		
		// changing the status of the job
		approveJob : approveJob
	};
	
	
	// function to fetch the pending user list
	function pendingUserList() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/user/request/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFactory Pending User List  Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFactory Pending User List  errResponse!')
				}	
			);
		return deferred.promise;
	}
	
	// function to change status of the pending users
	function changeStatus(id) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/user/request/approval/' + id)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFactory ChangeStatus of User  Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFactory ChangeStatus of User errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	// function to fetch the pending blog list
	function pendingBlogList() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/blog/request/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFcatory Pending Blog List Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFcatory Pending Blog List errResponse!')
				}	
			);
		return deferred.promise;
	}
	
	// function to change status of the pending blogs
	function changeBlogStatus(id) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/blog/request/approval/' + id)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFactory ChangeStatus of Blog  Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFactory ChangeStatus of Blog  errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	// function to fetch the pending forum request
	function fetchForumRequests() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/forum/request/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFactory Pending Forum Request Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFactory Pending Forum Request errResponse!')
				}	
			);
		return deferred.promise;
	}
	
	// function to change status of the pending forums
	function changeFRStatus(id) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/forum/request/approval/' + id)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFcatory Change Forum Request  Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFcatory Change Forum Request errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	// function to fetch the pending Events list
	function pendingEventList() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/event/request/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFactory Pending Events List Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFactory Pending Events List errResponse!')
				}	
			);
		return deferred.promise;
	}
	
	// function to approve  Events 
	function approveEvent(id) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/event/request/approval/' + id)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFcatory approve Event   Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFcatory approve Event  errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	// function to fetch the pending job list
	function pendingJobList() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/job/request/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFactory Pending Job List Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFactory Pending Job List errResponse!')
				}	
			);
		return deferred.promise;
	}
	
	// function to approve job
	function approveJob(id) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/job/request/approval/' + id)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In RequestFcatory approve Job Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In RequestFcatory approve Job errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
}]);