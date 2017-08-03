var admin = angular.module('adminModule',[]);

admin.factory('adminFactory',['$http','$q',function($http,$q){
	
	// For Linking to backend Project
	var url = 'http://localhost:8081/SocialProBE/';
	
	return {
		approvedUserList : approvedUserList,
		approvedBlogList : approvedBlogList,
		fetchForumList : fetchForumList,
		fetchEventList : fetchEventList,
		changeUserRole : changeUserRole,
		manageJobs : manageJobs
	};
	
	// function to fetch approved user List
	function approvedUserList() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/user/manage/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In AdminFactory approvedUserList Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In AdminFactory approvedUserList errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
	// function to fetch approved blog List
	function approvedBlogList() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/blog/manage/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In AdminFactory approvedBlogList Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In AdminFactory approvedBlogList errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	// function to fetch approved blog List
	function fetchForumList() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/forum/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In AdminFactory fetchForumList Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In AdminFactory fetchForumList errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
	// function to fetch approved event List
	function fetchEventList() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/event/manage/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In AdminFactory fetchEventList Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In AdminFactory fetchEventList errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
	
	// function to fetch approved job List
	function manageJobs() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/job/manage/list')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In AdminFactory ManageJob Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In AdminFactory ManageJob errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
	// function to change user role
	function changeUserRole(user) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/user/role/manage',user)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In AdminFactory ChangeUserRole Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In AdminFactory ChangeUserRole errResponse!');
				}	
			);
		return deferred.promise;
	}
	
		
	

	

	
}]);