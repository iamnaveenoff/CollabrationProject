request.controller('requestController',
		['requestFactory','$timeout','$cookies','$routeParams','$location','$route','$rootScope',
			function(requestFactory,$timeout,$cookies,$routeParams,$location,$route,$rootScope) {
			
			var self =this;
			
			// for Storing list of pending users
			self.pendingUsers = [];
			
			// for Storing list of pending Blogs
			self.pendingBlogs = [];
			
			// for Storing list of Forums Request
			self.forumRequests = [];
			
			// for Storing list of pending Events
			self.pendingEvents = [];
			
			// for Storing list of pending Jobs
			self.pendingJobs = [];
			
			
			// calling jQuery once controller has loaded
			$timeout(function (){
				setting();
			},100);
			
			
			// function to view list of all pending Users
			self.pendingUserList = function() {
				
				requestFactory.pendingUserList()
					.then(function(pendingUsers){
							self.pendingUsers = pendingUsers;
							console.log('SucessFully fetched Pending User list!'+ self.pendingUsers);
							$rootScope.notifyUserCount = self.pendingUsers.length;
							console.log(self.pendingUsers.length);
						},
					function(errResponse){
							console.error('Failed to fetch pending User list!');
						}	
					);
			}
			
			// function to change status of user registration or approve user
			self.changeStatus = function(id) {
				
				requestFactory.changeStatus(id)
					.then(function(user){
							$route.reload();
							Materialize.toast('User Approved!',2000);
							console.log('In requestController Change User Status! Sucess Function!');
						},
					function(errResponse){
							console.error('In requestController Change User Status! UnSucess Function!');
						}	
					);
			}
			
			
			// function to view list of all pending Blogs
			self.pendingBlogList = function() {
				
				requestFactory.pendingBlogList()
					.then(function(pendingBlogs){
							self.pendingBlogs = pendingBlogs;
							console.log('SucessFully fetched Pending Blog list!');
						},
					function(errResponse){
							console.error('Failed to fetch pending Blog list!');
						}	
					);
			}
			
			// function to change status of blog or approve blog
			self.changeBlogStatus = function(id) {
				
				requestFactory.changeBlogStatus(id)
					.then(function(blog){
							$route.reload();
							Materialize.toast('Blog Approved!',2000);
							pendingBlogList();
							console.log('In requestController Change Blog Status! Sucess Function!');
						},
					function(errResponse){
							console.error('In requestController Change Blog Status! UnSucess Function!');
						}	
					);
			}
			
			
			// function to view list of all  Forum request
			self.fetchForumRequests = function() {
				
				requestFactory.fetchForumRequests()
					.then(function(forumRequests){
							self.forumRequests = forumRequests;
							console.log('SucessFully fetched all Requests of the Forum!');
						},
					function(errResponse){
							console.error('Failed to fetch all Requests of the Forum!');
						}	
					);
			}
			
			// function to change status of forumRequest or approve forumRequest
			self.changeFRStatus = function(id) {
				
				requestFactory.changeFRStatus(id)
					.then(function(forumRequest){
							$route.reload();
							console.log('In requestController Change ForumRequest Status! Sucess Function!');
						},
					function(errResponse){
							console.error('In requestController Change ForumRequest Status! UnSucess Function!');
						}	
					);
			}
			
			
			// function to view list of all pending events
			self.pendingEventList = function() {
				
				requestFactory.pendingEventList()
					.then(function(pendingEvents){
							self.pendingEvents = pendingEvents;
							console.log('SucessFully fetched Pending Event list!');
						},
					function(errResponse){
							console.error('Failed to fetch pending Event list!');
						}	
					);
			}
			
			// function to change status of event or approve event
			self.approveEvent = function(id) {
				
				requestFactory.approveEvent(id)
					.then(function(event){
							$route.reload();
							Materialize.toast('Event Approved!',2000);
							console.log('In requestController Change Event Status! Sucess Function!');
						},
					function(errResponse){
							console.error('In requestController Change Event Status! UnSucess Function!');
						}	
					);
			}
			
			
			// function to view list of all pending Jobs
			self.pendingJobList = function() {
				
				requestFactory.pendingJobList()
					.then(function(pendingJobs){
							self.pendingJobs = pendingJobs;
							console.log('SucessFully fetched Pending Job list!');
						},
					function(errResponse){
							console.error('Failed to fetch pending Job list!');
						}	
					);
			}
			
			// function to change status of job or approve job
			self.approveJob = function(id) {
				
				requestFactory.approveJob(id)
					.then(function(job){
							$route.reload();
							Materialize.toast('Job Approved!',2000);
							console.log('In requestController Change job Status! Sucess Function!');
						},
					function(errResponse){
							console.error('In requestController Change job Status! UnSucess Function!');
						}	
					);
			}
			
			
			
		}]);