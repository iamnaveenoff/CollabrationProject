user.controller('userController',
		[
			'userFactory',
			'AuthenticationFactory',
			'blogFactory',
			'forumFactory',
			'jobFactory',
			'eventFactory',
			'$timeout',
			'$cookies',
			'$routeParams',
			'$location',
			'$rootScope',
			'$route',
			
			function(
					userFactory,
					AuthenticationFactory,
					blogFactory,
					forumFactory,
					jobFactory,
					eventFactory,
					$timeout,
					$cookies,
					$routeParams,
					$location,
					$rootScope,
					$route) {
	
			var self = this;
			
			// Load User From Cookies
			self.user = AuthenticationFactory.loadUserFromCookies();
			
			// Contain For Use Home
			self.contain = [];
			
			// Fetching list of events created by user
			self.myEvents = [];
			
			self.picture = undefined;
			
			self.user.profile = self.user.profile + '?decached=' + Math.random();
			
			self.hasApplied = false;
			
			self.appliedJobCount = [];
			
			self.appliedFor = [];
			
			self.joinedEventCount = [];
			
			self.user = [];
			
			self.myFriends = [];
			
			self.friendsCount = [];
			
			self.myOnlineFriends = [];
			
			self.countOnlineFriends = [];
			
			self.myBlogCount = [];
			
			
			// calling jQuery once Controller has been  loaded
			$timeout(function (){
				setting();
			},100);
			
			
			// Fetching blogs, forums,jobs and events on the page
			
			self.fetchContain = function () {
				
				console.log("FetchContain method called!");
				
				userFactory.fetchContain()
					.then(function(data){
							debugger;
							self.contain = data;
							
						},
					function(errResponse){
							concole.log("Failed to Fetch the top3Events");
						}	
					);
			}
			
			// to upload the file
			
			self.uploadFile = function () {
				
				
				console.log("Starting of the method Upload File!");
				
				if(self.picture == undefined) {
					return;
				}
				
				userFactory.uploadFile(self.picture)
					.then(function(response) {
						
							$rootScope.message= 'Profile picture updated successfully!';
							self.user.profile = response.message + '?decached=' + Math.random();
							
							// update the Controller user too
							$rootScope.user.profile = response.message + '?decached=' + Math.random();
							
							// need to update the cookie value too
							AuthenticationFactory.saveUser($rootScope.user);
							$('#change-photo').modal('close');
							
							// hide the card panel by setting the rootScope.message as undefined
								/*$timeout(function() {
									$rootScope.message = undefined;
								},2000);*/
							
						},
					function(errResponse){
							console.log(errResponse);
						}	
					);
			}
			
			// method to apply for a job
			
			self.applyJob = function(id) {
				
				jobFactory.applyJob(id)
					.then(function(job){
							debugger;
							$route.reload();
							Materialize.toast('Applied for Job successfully!',3000);
							self.appliedFor.push(id);
							console.log('Applied For Job successfully!');
						},
					function(errResponse){
							console.log("Failed to Apply for Job!");
						}	
					);
			}
			
			
			// Method to Join Event
			
			self.joinEvent = function(id) {
				
				eventFactory.joinEvent(id)
					.then(function(event){
							$route.reload();
							Materialize.toast('Event Joined sucessfully!',3000);
							self.appliedFor.push(id);
							console.log('Event Joined sucessfully!');
						},
					function(errResponse){
							console.log('Failed Join Evnet!');
						}	
					);
			}
			
			// Function to fetch User and User Details
			self.fetchUser = function() {
				
				var id = $routeParams.id;
				
				userFactory.fetchUser(id)
					.then(function(user) {
							debugger;
							self.user = user;
							/*self.user.birthDate = new Date( self.user.user.birthDate[0], self.user.user.birthDate[1] -1, self.user.user.birthDate[2]);*/
							
							self.myBlogCount = self.user.blog.length;
							self.joinedEventCount = self.user.joinedEvents.length;
							self.appliedJobCount = self.user.appliedJobList.length;

							
							console.log('Sucessfully fetched User And User Details!');
						},
					function(errResponse) {
							console.log('Failed to Fetch User  and User details!');
						}	
						
					);
			}
			
			// Function to Fetch my friends
			
			self.fetchMyFriends = function() {
				
				debugger;
				userFactory.fetchMyFriends()
					.then(function(myFriends){
							debugger;
							self.myFriends = myFriends;
							self.friendsCount = self.myFriends.length;
							console.log('Sucessfully fetched my friends!');
						},
					function(errResponse) {
							console.log('Failed to fetch my Friends!');
						}	
					);
			}
			
			// Function to fetch online friends
			
			self.fetchOnlineFriends = function() {
				
				debugger;
				console.log('Showing Online Friends now!');
				
				userFactory.fetchOnlineFriends()
					.then(function(onlineFriends){
							debugger;
							self.myOnlineFriends = onlineFriends;
							self.countOnlineFriends = self.myOnlineFriends.length;
							console.log('Successfully fetched online Friends!');
						},
						function(errResponse){
							console.log('Failed to fetch online Friends!');
						}
					);
			}
}]);
