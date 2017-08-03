
var user = angular.module('userModule',[]);

/**
 * AngularJS provides $parse service to evaluate expression.
 * In a template AngularJS expression are presented in {{ }}.
 * AngularJS uses $parse under the hood to compile link and display the value in the browser.
 * $parse() method returns a function for the given expression context.
 * The value of the context can be changes using assign() method.
 */

// Custom Directive for upload multipart file or Form data 

user.directive('fileModel',['$parse',function ($parse){
	
	return {
		restrict : 'A',
		link : function(scope,element,attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			element.bind('change',function() {
				scope.$apply(function() {
					modelSetter(scope,element[0].files[0]);
				});
			});
		}
	};
}]);

// Factory or Service method
user.factory('userFactory',['$http','$q','$rootScope','$routeParams',function($http,$q,$rootScope,$routeParams){
	
	// for Linking backend project with the front end
	var url = 'http://localhost:8081/SocialProBE/';
	
	return {
		userEventList : userEventList,
		uploadFile : uploadFile,
		fetchUser : fetchUser,
		fetchContain : fetchContain,
		fetchMyFriends : fetchMyFriends,
		fetchOnlineFriends : fetchOnlineFriends
	};
	
	// Function to fetch user event list
	
	function userEventList(id) {
		
		console.log('Inside Factory now!');
		var deferred = $q.defer();
		
		$http.get(url + 'user/events/list/'+id)
			.then(function(response){
				deferred.resolve(reponse.data);
				},
			function(errResponse) {
				deferred.reject(errResponse);	
				}
			);
		return deferred.promise;
	}
	
	// Function for Uploading the image File on the server
	
	function uploadFile(file) {
		
		var deferred = $q.defer();
		
		// NOTE: the 'Content-Type' is undefined to add a boundary between the multipart content
        // and other data content which is added automatically thats why here we don't use 
		
		var fd = new FormData();
		fd.append('file',file);
		// send the user id which can be used to update the usera
        // and to set the file name
		fd.append('id',$rootScope.user.id);
		
		$http.post( url +'/upload/profile-picture', fd, {
			transformRequest : angular.identity,
			headers : {'Content-Type': undefined }
			})
			.then(function(response) {
				deferred.resolve(response.data);
				},
			function(errResponse) {
					console.log('errResponse');
					deferred.reject(errResponse);
				}	
			);
		return deferred.promise;
	}
	
	// Function to fetch the User and UserDetails
	
	function fetchUser(id) {
		
		var deferred = $q.defer();
		
		$http.get(url+'/user/'+id)
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse);
				}
			);
		return deferred.promise;
	}
	
	// function to fetch main page Content
	
	function fetchContain() {
		
		var deferred = $q.defer();
		
		$http.get(url + '/main/contain')
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse);
				}
			);
		return deferred.promise;
	}	
	
	// Function to fetch User Friends
	
	function fetchMyFriends() {
		debugger;
		var deferred = $q.defer();
	
		var userId = user.id;
		
		$http.get(url+'/my/friends/'+userId)
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse);
				}
			);
		return deferred.promise;
	}
	
	// function to fetch My online Friends
	
	function fetchOnlineFriends() {
		
		var deferred = $q.defer();
		
		var userId = user.id;
		
		$http.get(url + '/my/online/friends/'+userId)
			.then(function(response){
					deferred.resolve(response.data);
				},
			function(errResponse){
					deferred.reject(errResponse);
				}
			);
		return deferred.promise;
	}
	
}]);