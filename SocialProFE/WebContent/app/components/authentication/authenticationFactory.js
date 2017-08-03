var authenticate = angular.module('authenticationModule',['ngCookies']);

authenticate.factory('AuthenticationFactory',['$http','$q','$rootScope','$cookies',function($http,$q,$rootScope,$cookies){
	
	// Linking backend project with frontend
	
	var url = 'http://localhost:8081/SocialProBE/';
	var userIsAuthenticated = false;
	var role = 'GUEST';
	
	return {
		setUserIsAuthenticated : setUserIsAuthenticated,
		getUserIsAuthenticated : getUserIsAuthenticated,
		loadUserFromCookies : loadUserFromCookies,
		checkUsername : checkUsername,
		saveUser : saveUser,
		setRole : setRole,
		getRole : getRole,
		login : login,
		register : register,
		logout : logout
	};
	
	function setUserIsAuthenticated(value){
		userIsAuthenticated = value;
	};
	
	function getUserIsAuthenticated(){
		return	userIsAuthenticated;
	};
	
	//loading user from cookies
	function loadUserFromCookies() {
		
		user = $cookies.getObject('user');
		if(user) {
			userIsAuthenticated = true;
			role = user.role;
		}
		else {
			userIsAuthenticated = false;
			role = 'GUEST';
		}
		return user;
	}
	
	// saving user inside cookies
	
	function saveUser(user) {
		debugger;
		$cookies.putObject('user',user);
		role = user.role;
		userIsAuthenticated = true;
	}
	
	function setRole(value){
		role = value;
	}
	
	function getRole(){
		return role;
	}
	
	// method for user login
	function login(credentials) {
		var deferred = $q.defer();
		
		$http.post(url + '/login',credentials)
		.then(function(response){
			
			deferred.resolve(response.data);
			console.log('Successfully Login');
			},
			function(errResponse){
				console.log('Failed to Login Please Give Valid credentials')
				deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}
	
	// method for checking username
	function checkUsername(username) {
		var deferred = $q.defer();
		
		$http.post(url + '/checkUser',username)
		.then(function(response){
			console.log('Successfully get the user');
			deferred.resolve(response);
			},
			function(error){
				console.log('Failed to get the User Name');
				deferred.reject(error);
			}
		);
		return deferred.promise;
	}
	
	// method for user registration
	function register(user) {
		var deferred = $q.defer();
		
		$http.post(url + '/register',user)
		.then(function(response){
			console.log('Successfully Registered');
			deferred.resolve(response.data);
			},
			function(errResponse){
				console.log("Error While Registring");
				deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}
	
	//method for user logout
	function logout(user) {
		debugger;
		var deferred = $q.defer();
		
		$http.post(url + '/logout',user)
		.then(function(response){
			$cookies.putObject('user',undefined);
			userIsAuthenticated = false;
			role = 'GUEST',
			deferred.resolve(response);
			Materialize.toast('Logout Successfully!',2000);
		});
		return deferred.promise;
	}
}]);