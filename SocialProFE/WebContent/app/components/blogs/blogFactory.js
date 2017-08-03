var blog = angular.module('blogModule',[]);

/**
 * $q:- A service that helps you run functions asynchronously,
 * and use their return values (or exceptions) when they are done processing.
 * 
 * A new instance of deferred is constructed by calling $q.defer().
 * The purpose of the deferred object is to expose the associated Promise instance as well as APIs
 * that can be used for signaling the successful or unsuccessful completion, as well as the status of the task.
 * 
 * defer():- Creates a Deferred object which represents a task which will finish in the future.
 * deferred :- Returns a new instance of deferred.
 * reject : - Creates a promise that is resolved as rejected with the specified reason
 * promise :- Returns a promise of the passed value or promise
 */


blog.factory('blogFactory',['$http','$q',function ($http,$q){
	
	// For linking backend project with the frontend
	
	var url = 'http://localhost:8081/SocialProBE/';
	
	return {
		addBlog : addBlog,
		viewBlog : viewBlog,
		bloglist : bloglist,
		blogCommentlist : blogCommentlist,
		likes : likes,
		deleteBlog : deleteBlog
	};
	
	// Function to add the blog
	function addBlog(blog){
		
		var deferred = $q.defer();
		
		$http.post(blogUrl + 'blog/new',blog)
		.then(function(response){
			//resolves the derived promise with the value
			deferred.resolve(response.data);
			},
			function(response){
				//the promise will be rejected instead.
				deferred.reject(errResponse);
			}
		);
		// promise object associated with this deferred
		return deferred.promise;
	}
	
	
	// function to like the blog
	
	function likes(id) {
		
		var deferred = $q.defer();
		
		$http.post(blogUrl+'/blog/like/' +id)
		.then(function(response){
			deferred.resolve(response.data);
			},
		function(errResponse) {
			deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}
	
	// function for viewing single blog using blog id as parameter
	function viewBlog(id) {
		console.log('Inside Factory now');
		
		var deferred = $q.defer();
		
		$http.get(blogUrl + '/blog/' +id)
		.then(function(response){
			deferred.resolve(response.data);
			},
		function(errResponse) {
				deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}
	
	
	// function to fetch blog list
	
	function bloglist() {
		console.log('Inside Factory now');
		
		var deferred = $q.defer();
		
		$http.get(blogUrl + '/blog/list/status')
		.then(function(response){
			deferred.resolve(response.data);
			},
		function(errResponse) {
				deferred.reject(errResponse);
			}	
		);
		
		return deferred.promise;
	}
	
	// Function to fetch blog comment list
	
	function blogCommentlist(blogId) {
		console.log('Inside Factory now');
		
		var deferred = $q.defer();
		
		$http.get(blogUrl + 'blog/comment/list/' + blogId)
		.then(function(response){
			deferred.resolve(response.data);
			},
		function(errResponse) {
				deferred.reject(errResponse);
			}
		);
		return deferred.promise;
	}
	
	// function to delete Blog
	function deleteBlog(blogid) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/delete/blog/' +blogid)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In adminFactory deleteBlog Response!');
				},
			function(errResponse){
					deferred.reject(errReponse.data);
					console.error('In adminFactory deleteBlog errResponse!');
				}	
			);
		return deferred.promise;
	}

	
}]);
