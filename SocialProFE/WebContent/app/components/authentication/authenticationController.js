authenticate.controller('authenticationController',
		['AuthenticationFactory','$rootScope','$location','$timeout','$scope','$route',
	function(AuthenticationFactory,$rootScope,$location,$timeout,$scope,$route){
			var self = this;
			self.credentials = {};
			self.error = false;
			self.authError = false;
			
			 // flag display Whether username already exist or not
			self.usernameExist = false;
			
			self.temp = [];
			
			// setting up the fields for registration - should be same as fields in the entity  class
			self.client = {
				id : null,
				firstName : '',
				lastName : '',
				username : '',
				password : '',
				confirmPassword : '',
				emailId : '',
				/*birthDate : new Date().toISOString().slice(0,10),*/
				birthDate : '',
				gender : '',
				phone : ''
			};
			
			// calling jQuery once Controller has loaded
			$timeout(function(){
				setting();
			},100);
			
			// function for registering the user will come here
			self.register = function() {
				debugger;
				var date = new Date(self.client.birthDate).toISOString().slice(0,10);
				self.client.birthDate = date;
				
				//var date = new Date(self.client.birthDate.toISOString());
				//self.client.birthDate = date;
				console.log(self.client);
				AuthenticationFactory.register(self.client)
				.then(function(user) {
					AuthenticationFactory.setUserIsAuthenticated(false);
					$rootScope.authenticated = false;
					self.register = true;
					$rootScope.msg = "You are Successfully Registerred! You will get an email after approval.";
					$route.reload();
					$location.path('/home');
					Materialize.toast('Registration Successful!',2000);
					},
					function(errResponse) {
						AuthenticationFactory.setUserIsAuthenticated(false);
						$rootScope.authenticated = false;
						self.error = true;
					}
				)
			}
			
			// method to check whether username is already  Exists or not
			self.checkUsername = function() {
				debugger;
				var username = self.client;
				// If username is undefined and has some characters
				if(username){
					AuthenticationFactory.checkUsername(username)
					.then(function(response){
						debugger;
							if(response.status == 302) {
								self.usernameExist = true;
								console.log("Username Doesn't Exist")
								// setting the validity as false if the username already exist
								$scope.register.reg_username.$setValidity("reg_username",false);
							}
/*							else {
								self.usernameExist = false;
								console.log("User Already Exist")
								// setting the validity as true if the username already exist
								$scope.register.reg_username.$setValidity("reg_username",true);
							}
*/						},
						function(error){
							if(error.status == 302) {
								self.usernameExist = true;
								console.log("Username Aready Taken!")
								// setting the validity as false if the username already exist
								$scope.register.reg_username.$setValidity("reg_username",false);
							}
							else {
								self.usernameExist = false;
								console.log("User Does not Exist!")
								$scope.register.reg_username.$setValidity("reg_username",true);
							}
						}
					);
				}
			}
			
			// Method for user Login
			self.login = function() {
				debugger;
				AuthenticationFactory.login(self.credentials)
				.then(function(user){
					debugger;
					
					if(self.credentials.username == null || self.credentials.password == null) {
						self.error = true;
						$rootScope.message = "Please Provide both Username and Password!";
					}
					else if (user.username == null || user.password == null) {
						self.error = true;
						$rootScope.message = "Incorrect Username and Password!";
					}
					else if (user.status == 'PENDING') {
						self.error = true;
						$rootScope.message = "Your Registration Request is not Approved yet!";
					}
					else if (user.status == 'REJECT') {
						self.error = true;
						$rootScope.message = "Your Registration Request has been Rejected!";
					}
					else {
						debugger;
						AuthenticationFactory.setUserIsAuthenticated(true);
						console.log(user);
						AuthenticationFactory.setRole(user.role);
						$rootScope.authenticated = true;
						$rootScope.message = "Welcome" +user.username;
						AuthenticationFactory.saveUser(user);
							
							switch(user.role) {
								case 'Super_Admin' : 
									self.isSuperAdmin = true;
									$location.path('/user');
									break;
								case 'Admin' :
									self.isAdmin = true;
									$location.path('/user');
									break;
								case 'Employer' : 
									self.isEmployer = true;
									$location.path('/user');
									break;
								case 'User' :
									self.isUser = true;
									$location.path('/user');
									break;
								default : 
									$location.path('/home');
							}
							$rootScope.isLogin = true;	
						}
					},
					function(error){
						AuthenticationFactory.setUserIsAuthenticated(false);
						$rootScope.authenticate = false;
					}
				);
			}
			
}]);