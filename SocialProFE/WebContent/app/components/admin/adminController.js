admin.controller('adminController',
		['adminFactory','$timeout','$cookies','$routeParams','$location','$route',
			function(adminFactory,$timeout,$cookies,$routeParams,$location,$route){
			
			var self = this;
			
			//for temparary storing list of users
			self.temUserList = [];
			
			// for list of approved user list
			self.approvedUserList = [];
			
			// for list of approved blog list
			self.approvedBlogList = [];
			
			// for list of forum list
			self.forumsList = [];
			
			// for list of approved job list
			self.approvedJobList = [];
			
			// for list of event list
			self.eventsList = [];
			
			// calling jQuery once controller has loaded
			$timeout(function (){
				setting();
			},1000);
			
			// Function to fetch Approved user List
			self.approvedUserList = function() {
				debugger;
				
				adminFactory.approvedUserList()
					.then(function(approvedUsers){
							debugger;
							// setting up an var index as 0
							/*var index = '0'; 
							// traversing through array to remove user with super admin role
							for(var user in approvedUsers){
								var role = approvedUsers[user].role;
								// if role is not super admin add the user to new list
								if(role != 'Super_Admin'){
									self.tempUserList[index++] = approvedUsers[user];
								}
							}*/
							// assigning temp user list to approvedUser list
							//self.approvedUserList = self.tempUserList;
							
							self.approvedUserList = approvedUsers;
							
							console.log('Sucessfully get list of approvedUserList!')
							
							$timeout(function(){
								angular.element('select').material_select();
							},3000);
						},
					function(errResponse) {
							console.error('Failed to get list of approvedUserList!')
						}	
					);
			}
			
			
			// function to fetch approved blog list
			self.approvedBlogList = function() {
				
				adminFactory.approvedBlogList()
					.then(function(approvedBlogs){
							self.approvedBlogList = approvedBlogs;
							console.log('Sucessfully fetched approved Blog list!');
						},
					function(errResponse){
							console.error('Failed to fetch approved Blog list!');
						}	
					);
			}
			
			
			// function to fetch approved Forum list
			self.fetchForumList = function() {
				
				adminFactory.fetchForumList()
					.then(function(approvedForums){
							self.forumsList = approvedForums;
							console.log('Sucessfully fetched approved Forums list!');
						},
					function(errResponse){
							console.error('Failed to fetch approved Forums list!');
						}	
					);
			}
			
			// function to fetch approved job list
			self.manageJobs = function() {
				
				adminFactory.manageJobs()
					.then(function(approvedJobs){
							self.approvedJobList = approvedJobs;
							console.log('Sucessfully fetched approved Job list!');
						},
					function(errResponse){
							console.error('Failed to fetch approved Job list!');
						}	
					);
			}
			
			
			// function to fetch approved event list
			self.fetchEventList = function() {
				
				adminFactory.fetchEventList()
					.then(function(approvedEvents){
							self.eventsList = approvedEvents;
							console.log('Sucessfully fetched approved Events list!');
						},
					function(errResponse){
							console.error('Failed to fetch approved Events list!');
						}	
					);
			}
			
			
			// function to change user role
			self.changeUserRole = function(user) {
				debugger;
				console.log(user.role);
				adminFactory.changeUserRole(user)
					.then(function(user){
							$route.reload();
							Materialize.toast('User role Changed SucessFully!',2000);
							console.log('Sucessfully Chnaged user Role!');
						},
					function(errResponse){
							console.error('Failed to Change User role!');
						}	
					);
			}
			
			
			
			
}]);