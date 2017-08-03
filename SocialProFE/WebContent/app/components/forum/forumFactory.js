var forum = angular.module('forumModule',[]);

forum.factory('forumFactory',['$http','$q','$routeParams',function($http,$q,$routeParams){
	
	// For Linking with backend project
	var url = 'http://localhost:8081/SocialProBE/';
	
	return {
		
		addForum : addForum,
		fetchForums : fetchForums,
		viewForum : viewForum,
		joinRequest : joinRequest,
		getParticipatedUsers : getParticipatedUsers,
		addForumPost : addForumPost,
		fetchForumPosts : fetchForumPosts
	};
	
	// function to add a  new Forum in a Forum Category
	
	function addForum(forum) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/forum/new',forum)
		.then(function(response){
				deferred.resolve(response.data);
			},
		function(errResponse){
				deferred.reject(errResponse.data)
			}
		);
		return deferred.promise;
	}
	
	// function to fetch list of Forum categories
	
	function fetchForums() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/forum/list/')
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	// Function for View Single forum using forum id as a parameter
	
	function viewForum(id) {
		
		var deferred = $q.defer();
		
		$http.get(url + '/forum/' + id)
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	// Function to send Request to Forum for Join
	
	function joinRequest() {
		
		var deferred = $q.defer();
		var id = user;
		var forumId = $routeParams.id;
		
		$http.post(url + '/forum/request/' + forumId, id)
			.then(function(response){
					deferred.resolve(response.data);
				},
				function(errResponse){
					deferred.reject(errResponse.data);
				}
			);
		return deferred.promise;
	}
	
	// Function to fetch Forum List of ParticipatedUsers
	
	function getParticipatedUsers(id) {
		
		var deferred = $q.defer();
		
		$http.get(url + '/forum/participatedUsers/list/' + id)
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	// Function to add a new forum post
	
	function addForumPost(forumPost) {
		
		var deferred = $q.defer();
		
		var forumId = $routeParams.id;
		
		$http.post(url + '/forum/post/new/' + forumId, forumPost)
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	// Function to fetch Forum post List 
	
	function fetchForumPosts(forumId) {
		
		var deferred = $q.defer();
		
		$http.get(url + '/forum/post/list/' + forumId)
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	
}]);