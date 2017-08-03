forum.controller('forumController',
		['forumFactory','$timeout','$cookies','$routeParams','$location','$route','$q',
	function(forumFactory,$timeout,$cookies,$routeParams,$location,$route,$q) {
	
			var self = this;
			
			// Setting up the field for Creating new Forum Category
			
			self.Forum = {
					
					id : null,
					name : '',
					description : '',
					createDate : '',
					userId : '',
					userName : ''
			}
			
			// Setting up the field for creating new forum post
			
			self.ForumPost = {
					
					id : null,
					title : '',
					description : '',
					postDate : '',
					userId : '',
					userName : ''
			}
			
			// Array for Displaying the list of Forum Categories
			self.forums = [];
			
			// For Viewing the Single Forum
			self.singleForum = {};
			
			// Setting up Creator of Forum  
			self.singleForumUser = [];
			
			// List of participated users
			self.participatedUsers = [];
			
			// Flag  to see whether user is participant or not
			self.isParticipant = false;
			
			// Flag to Check request status
			self.isApproved = false;
			
			// For Storing participant status
			self.participantStatus = "PENDING";
			
			// For list of All Forum Posts
			self.forumPostsList = [];
			
			// For List of Forum Posts By User
			self.forumPostUser = [];
			
			
			// Calling JQuery once Controller has loaded
			$timeout(function () {
				setting();
			}, 100);
			
			
			// Method For Adding new Forum Category
	
			self.addForum = function() {
				
				// Setting username and user id
				self.Forum.userId = user.id;
				self.Forum.userName = user.username;
				
				forumFactory.addForum(self.Forum)
					.then(function(forum){
							self.Forum = forum;
							/*$route.reload();*/
							var fId = self.Forum.id;
							$location.path('/forum/'+fId);
							Materialize.toast('Forum Topic Created Sucessfully!',2000);
							/*$('#category').modal('close');*/
							console.log('Sucessfully Added Forum Categories!');
						},
					function(errResponse){
							console.log('Failed to Add the Forum categories!');
						}
					);
			}
			
			// Method to fetch all the forum categories
			
			self.fetchForums = function() {
				debugger;
				
				forumFactory.fetchForums()
					.then(function(forums) {
							self.forums = forums;
							console.log('Sucessfully Fetched Forum Categories!');
						},
					function(errResponse){
							console.log('Failed to Fetch the Forum categories!');
						}	
					);
			}
			
			// Function for Viewing single forum
			
			self.viewForum = function() {
				
				// First Fetch the participated users for this forum
				getParticipatedUsers()
					.then(function(participatedUsers){
							// store the list of participated users in already defined array
							self.participatedUsers = participatedUsers;
							
							for(var id in self.participatedUsers) {
								
								if(user.id == self.participatedUsers[id].userId) {
									// If active user is present in the list of participant set the flag as true &
									//  store its fetch its request status
									self.isParticipant = true;
									self.participantStatus = self.participatedUsers[id].status;
									break;
								}
							}
							
							// If User is Participant
							if(self.participantStatus == "APPROVED"){
								self.isApproved = true;
							}
							
							// Fetching Single Forum Page here 
							// Assigning Forum id to variable forumId
							var forumId = $routeParams.id;
							forumFactory.viewForum(forumId)
								.then(function(forumModel){
										self.singleForum = forumModel.forum;
										self.singleForumUser = forumModel.user;
										fetchForumPosts();
										console.log('Sucessfully Fetch Single Forum!');
									},
								function(errResponse){
										console.log('Failed to Fetch Single Forum!');
									}	
								);
							
						}
					);
			}
			
			
			// Function to Send Request for Joining the Forum
			
			self.joinRequest = function() {
				
				forumFactory.joinRequest()
					.then(function(forum){
							$route.reload();
							Materialize.toast('Request to Join the Forum sent!',3000);
							self.viewForum();
							console.log('Request to Join the Forum sent!');
						},
					function(errResponse){
							console.log(' Failed to Send Request to Join the Forum!');
						}	
					);
			}
			
			
			// Function to fetch the list of participated users
			
			function getParticipatedUsers() {
			
				var deferred = $q.defer();
				var forumId = $routeParams.id;
				
				forumFactory.getParticipatedUsers(forumId)
					.then(function(participatedUsers){
							deferred.resolve(participatedUsers);
						},
					function(errReponse){
							
						}	
					);
				return deferred.promise;
			}
			
			
			// Function for adding a new forum post
			
			self.addForumPost = function() {
				
				// setting the user is and username
				self.ForumPost.userId = user.id;
				self.ForumPost.userName = user.userName;
				
				forumFactory.addForumPost(self.ForumPost)
					.then(function(ForumPost){
							self.ForumPost = ForumPost;
							Materialize.toast('Post Sucessfully Added!',2000);
							$route.reload();
							$('#leaveAPost').modal('close');
							console.log('Post Sucessfully Added to the Forum!')
						},
					function(errResponse) {
							console.log('Failed to add the post to Forum!');
						}	
					);
			}
			
			
			// method to fetch forum Posts
			
			function fetchForumPosts() {
				
				var forumId = $routeParams.id;
				
				forumFactory.fetchForumPosts(forumId)
					.then(function(forumPosts){
							debugger;
							console.log('SucessFully Fetched the Forum Posts');
							self.forumPostsList = forumPosts;
							
						},
					function(errResponse){
							
						}	
					);
			}
	
			
}]);
