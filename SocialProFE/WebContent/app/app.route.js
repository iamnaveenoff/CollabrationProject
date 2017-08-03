window.routes = {
		
		// for login home page
		"/home" : {
			templateUrl : 'app/components/authentication/authentication.html',
			controller : 'authenticationController',
			controllerAs : 'authCtrl',
			requireLogin : false,
			roles : ['GUEST']
		},
		
		// For User Home Page
		"/user" : {
			templateUrl : 'app/components/user/profile.html',
			controller : 'userController',
			controllerAs : 'userCtrl',
			requireLogin : true,
			roles : ['User','Employer','Admin','Super_Admin']
		},
		
		// for User's Profile
		"/user/profile/:id" : {
			templateUrl : 'app/components/user/userProfile.html',
			controller : 'userController',
			controllerAs : 'userCtrl',
			requireLogin : true,
			roles : ['User','Employer','Admin','Super_Admin']
		},
		
		// for TOP 5 BLOGS
		/*"/top5/blogs" : {
			templateUrl : 'app/components/user/top5Blogs.html',
			controller : 'userController',
			controllerAs : 'userCtrl',
			requireLogin : true,
			roles : ['User','Employer','Admin','Super_Admin']
		},*/
		
		
		// for assigning role to the user and to update or delete user
		"/manage/users" : {
			templateUrl : 'app/components/user/manageUser.html',
			controller : 'adminController',
			controllerAs : 'adminCtrl',
			requireLogin : true,
			roles : ['Super_Admin']
		},
		
		// for accepting requests of users
		"/requests/users" : {
			templateUrl : 'app/components/user/userRequests.html',
			controller : 'requestController',
			controllerAs : 'requestCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		// form for creating new blog
		"/blog/new" : {
			templateUrl : 'app/components/blogs/newBlog.html',
			controller : 'blogController',
			controllerAs : 'blogCtrl',
			requireLogin : true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		// for viewing single blog
		"/blog/:id" : {
			templateUrl : 'app/components/blogs/blog.html',
			controller : 'blogController',
			controllerAs : 'blogCtrl',
			requireLogin : true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		// For viewing list of all blogs
		"/blogs/all" : {
			templateUrl : 'app/components/blogs/bloglist.html',
			controller : 'blogController',
			controllerAs : 'blogCtrl',
			requireLogin : true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		// for updating or delete blog
		"/manage/blogs" : {
			templateUrl : 'app/components/blogs/manageBlogs.html',
			controller : 'adminController',
			controllerAs : 'adminCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		// for accepting requests of blogs
		"/requests/blogs" : {
			templateUrl : 'app/components/blogs/blogRequests.html',
			controller : 'requestController',
			controllerAs : 'requestCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		// For creating new forum
		"/forum/new" : {
			templateUrl : 'app/components/forum/newForum.html',
			controller : 'forumController',
			controllerAs : 'forCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		// For viewing list of forums and adding a new one
		"/forum/list" : {
			templateUrl : 'app/components/forum/forumlist.html',
			controller : 'forumController',
			controllerAs : 'forCtrl',
			requireLogin : true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		// For viewing single forum topic
		"/forum/:id" : {
			templateUrl : 'app/components/forum/forum.html',
			controller : 'forumController',
			controllerAs : 'forCtrl',
			requireLogin : true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		
		// for updating or delete forum
		"/manage/forums" : {
			templateUrl : 'app/components/forum/manageForums.html',
			controller : 'adminController',
			controllerAs : 'adminCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		// for accepting requests of forums
		"/requests/forums" : {
			templateUrl : 'app/components/forum/forumRequests.html',
			controller : 'requestController',
			controllerAs : 'requestCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		
		// form for creating new event
		"/event/new" : {
			templateUrl : 'app/components/events/newEvent.html',
			controller : 'eventController',
			controllerAs : 'eventCtrl',
			requireLogin :true,
			roles : ['Super_Admin','Admin','Employer']
		},
		
		// For viewing list of event 
		"/events/list" : {
			templateUrl : 'app/components/events/eventlist.html',
			controller : 'eventController',
			controllerAs : 'eventCtrl',
			requireLogin :true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		// for viewing single event
		"/event/:id" : {
			templateUrl : 'app/components/events/event.html',
			controller : 'eventController',
			controllerAs : 'eventCtrl',
			requireLogin :true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		// for updating or delete events
		"/manage/events" : {
			templateUrl : 'app/components/events/manageEvents.html',
			controller : 'adminController',
			controllerAs : 'adminCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		// for accepting requests of events
		"/requests/events" : {
			templateUrl : 'app/components/events/eventsRequests.html',
			controller : 'requestController',
			controllerAs : 'requestCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		
		// for Creating new Job
		"/job/new" : {
			templateUrl : 'app/components/jobs/newJob.html',
			controller : 'jobController',
			controllerAs : 'jobCtrl',
			requireLogin :true,
			roles : ['Super_Admin','Admin','Employer']
		},
		
		
		// for viewing list of job
		"/jobs/list" : {
			templateUrl : 'app/components/jobs/joblist.html',
			controller : 'jobController',
			controllerAs : 'jobCtrl',
			requireLogin :true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		// for viewing single job
		"/job/:id" : {
			templateUrl : 'app/components/jobs/job.html',
			controller : 'jobController',
			controllerAs : 'jobCtrl',
			requireLogin :true,
			roles : ['User','Super_Admin','Admin','Employer']
		},
		
		
		// for updating or delete job
		"/manage/jobs" : {
			templateUrl : 'app/components/jobs/manageJobs.html',
			controller : 'adminController',
			controllerAs : 'adminCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		// for accepting requests of job
		"/requests/jobs" : {
			templateUrl : 'app/components/jobs/jobsRequests.html',
			controller : 'requestController',
			controllerAs : 'requestCtrl',
			requireLogin : true,
			roles : ['Super_Admin','Admin']
		},
		
		// for viewing the list of all site members
		"/member/list" : {
			templateUrl : 'app/components/friends/memberslist.html',
			controller : 'friendController',
			controllerAs : 'friendCtrl',
			requireLogin : true,
			roles : ['User','Employer','Super_Admin','Admin']
		},
		
		// for viewing the list of friend request user has received
		"/user/friendRequest" : {
			templateUrl : 'app/components/friends/friendRequests.html',
			controller : 'friendController',
			controllerAs : 'friendCtrl',
			requireLogin : true,
			roles : ['User','Employer','Super_Admin','Admin']
		},
		
		// for chatting with friend
		"/chat/:id/:username" : {
			templateUrl : 'app/components/chat/chat.html',
			controller : 'chatController',
			controllerAs : 'chatCtrl',
			requireLogin : true,
			roles : ['User','Employer','Super_Admin','Admin']
		},
		
		// for Navigating Error page
		"/error" : {
			templateUrl : 'app/components/authentication/error.html',
			controller : 'authenticationController',
			controllerAs : 'authCtrl',
			requireLogin : false,
			roles : ['GUEST']
		}
};

sbkchat.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider){
	
	// for page navigation
	for(var path in window.routes){
		$routeProvider.when(path,window.routes[path]);
	}
	
	$routeProvider.otherwise({redirectTo : '/home'});
}]);

// using Restful services data is coming here 

sbkchat.constant('url','http://localhost:8081/SocialProBE/');

sbkchat.run(function($rootScope,$location,AuthenticationFactory){
	
	$rootScope.$on('$locationChangeStart',function(event,next,current){
		
		if(next == current){
			$rootScope.user = AuthenticationFactory.loadUserFromCookies();
			$rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
			return;
		}
		
		// for interating through all the routes
		
		for(var i in window.routes){
			
			if(next.indexOf(i) != -1 || (i.indexOf("/:id") != -1)){
				$rootScope.user = AuthenticationFactory.loadUserFromCookies();
				$rootScope.authenticated = AuthenticationFactory.getUserIsAuthenticated();
				
				console.log(AuthenticationFactory.getUserIsAuthenticated());
				
				// if trying to access page that requires login and user is not authenticated redirect to login page
				
				if(window.routes[i].requireLogin && !AuthenticationFactory.getUserIsAuthenticated()){
					$location.path('/home');
				}
				else if ((AuthenticationFactory.getUserIsAuthenticated()) && (window.routes[i].roles.indexOf(AuthenticationFactory.getRole()) == -1))  {
					$location.path('/error');
				}
			}
		}
	});
	
	$rootScope.logout = function() {
		// calling the log out function created in the AuthenticationFcatory
		
		AuthenticationFactory.logout($rootScope.user)
			.then(function(){
					AuthenticationFactory.setUserIsAuthenticated(false);
					$rootScope.authenticated = false;
					$rootScope.message = "Logout Successfully!";
					$location.path('/home');
				},
			function(errResponse){
					console.log('Failed to Logout!');
				}	
			);
	};
	
});

