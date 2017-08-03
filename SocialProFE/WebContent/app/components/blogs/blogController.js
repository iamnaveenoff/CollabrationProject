blog.controller('blogController',
		['blogFactory','BlogCommentFactory','$timeout','$cookies','$routeParams','$location','$route',
			function(blogFactory,BlogCommentFactory,$timeout,$cookies,$routeParams,$location,$route){
			
			var self = this;
			
			// setting up the fields for creating new blog - should be same as fields in the entity class
			
			self.blog = {
					
					id : null,
					name : '',
					description : '',
					createDate : '',
					userId : '',
					username : ''
			}
			
			
			// setting up the fields for creating new blog comment - should be same as fields in the entity class
			
			self.blogComment = {
					
					id : null,
					title : '',
					blogComment : '',
					commentDate : '',
					userId : '',
					username : ''
			}
			
			// for viewing single blog
			self.singleBlog = {};
			
			// For Posting date on blog
			self.createDate = {};
			
			//self.bloglist = [];
			
			// calling list of user's blogs
			self.myblogs = [];
			
			// for displaying blog comments
			self.blogCommentList = [];
			
			
			// calling jQuery once controller has loaded
			$timeout(function(){
				setting();
			},100);
			
			
			// function for adding a new blog
			self.addBlog = function(){
				
				// setting  the userId and username
				self.blog.userId = user.id;
				self.blog.username = user.username;
				
				// calling the addBlog method in the factory
				blogFactory.addBlog(self.blog)
				.then(function(blog){
					self.blog = blog;
					var bId = self.blog.id;
					$location.path('/blog/'+bId);
					},
					function (errResponse){
						console.error('Failure!');
					}
				);
				
			}
			
			// function for viewing single blog
			self.viewBlog = function() {
				
				// Assigning blog id to blogId
				var blogId = $routeParams.id;
				blogFactory.viewBlog(blogId)
				.then(function(blog){
					self.singleBlog = blog;
					blogCommentlist(); // fetching blog comment list
					},
					function(errResponse){
						console.error('Failure!');
					}
				);
			}
			
			
			// Function to add likes to blog
			self.likes = function(id) {
				blogFactory.likes(id)
					.then(function(blog){
							$route.reload();
							console.log('Sucessfully liked Blog!');
						},
					function(errResponse){
							console.log('Failed  to likes the Blog!')
						}	
					);
			}
			
			
			// function for adding a new blog comment
			self.addBlogComment = function() {
				
				// setting the user id and username
				self.blogComment.userId = user.id;
				self.blogComment.username = user.username;
				// self.blogComment.blogId = $routeParams.id;
				
				// calling the addBlog method in the factory
				BlogCommentFactory.addBlogComment(self.blogComment)
				.then(function(blogComment){
					self.blogComment = blogComment;
					$route.reload();
					},
				function(errResponse){
						
					}
					
				);
			}
			
			// Function to view list of all blogs
			self.bloglist = function(){
				
				
				blogFactory.bloglist()
					.then(function(blogs){
						self.bloglist = blogs;
						console.log('Sucessfully fetched all blog list!');
						},
						function(errResponse){
							console.log('Failed to fetch all blog list!');
						}
					);
			}
			
			// Function to view list of all blog comments
			function blogCommentlist() {
				
				var blogId = $routeParams.id;
				blogFactory.blogCommentlist(blogId)
					.then(function(blogComments){
						debugger;
						self.blogCommentList = blogComments;
						},
						function(errResponse){
							
						}
					);
			}
			
			
			self.deleteBlog = function() {
				
				var blogid = $routeParams.id;
				
				blogFactory.deleteBlog(blogid)
					.then(function(blog){
							console.log('sucessfully deleted blog!');
							$route.reload();
						},
					function(errResponse){
							console.error('Failed to delete blog!');
						}	
					);
			}
			
			
		}]);