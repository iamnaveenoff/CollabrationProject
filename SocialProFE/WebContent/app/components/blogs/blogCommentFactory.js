var blogComment = angular.module('blogCommentModule',[]);

blogComment.factory('BlogCommentFactory',['$http','$q','$routeParams',function($http,$q,$routeParams){
	
	// Linking to backend Project
	
	var url = 'http://localhost:8081/SocialProBE/';
	
	return {
		addBlogComment : addBlogComment
	};
	
	// function to add a new blog comment
	function addBlogComment(blogComment) {
		
		var deferred = $q.defer();
		var blogId = $routeParams.id;
		$http.post(url + '/blog/comment/new/'+blogId,blogComment)
		.then(function(response){
			debugger;
			deferred.resolve(response.data);
			},
		function(errResponse){
				deferred.reject(errResponse.data);
			}
		);
		return deferred.promise;
	}
	
}]);