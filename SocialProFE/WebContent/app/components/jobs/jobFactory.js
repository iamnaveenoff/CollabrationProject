var job = angular.module('jobModule',[]);

job.factory('jobFactory',['$http','$q','$routeParams', function($http,$q,$routeParams){
	
	// For Linking with backend Project
	var jobUrl = "http://localhost:8081/SocialProBE/";
	
	return {
		addJob : addJob,
		joblist : joblist,
		viewJob : viewJob,
		applyJob : applyJob,
		getAppliedUsers : getAppliedUsers,
		deleteJob : deleteJob
	};
	
	
	// Function to add Job
	function addJob(job) {
		
		var deferred = $q.defer();
		$http.post(jobUrl + '/job/new',job)
			.then(function(response){
					console.log('In Job Factory AddJob Response!');
					deferred.resolve(response.data);
				},
			function(errResponse){
					console.error('In Job Factory AddJob errResponse!');
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	// Function to get the list job
	function joblist() {
		
		var deferred = $q.defer();
		
		$http.get(jobUrl + '/job/list/status/')
			.then(function(response){
					console.log('In Job Factory jobList Response!');
					deferred.resolve(response.data);
				},
			function(errResponse){
					console.error('In Job Factory jobList errResponse!');
					deferred.reject(errResponse.data);
				}
			);
		return deferred.promise;
	}
	
	// function to apply for a job
	function applyJob() {
		
		var deferred = $q.defer();
		var id = user;
		var jobId = $routeParams.id;
		
		$http.post(jobUrl + 'job/apply/'+ jobId ,id )
			.then(function(response){
					console.log('In Job Factory applyJob Response!');
					deferred.resolve(response.data);
				},
			function(errResponse){
					console.error('In Job Factory applyJob errResponse!');
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	// function to view single Job
	function viewJob(id) {
		
		var deferred = $q.defer();
		
		$http.get(jobUrl + '/job/'+ id)
			.then(function(response){
					console.log('In Job Factory viewJOb Response!');
					deferred.resolve(response.data);
				},
			function(errResponse){
					console.error('In Job Factory viewJob errResponse!');
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	// function to get the list of user Applied for a particular job
	function getAppliedUsers(id) {
		
		var deferred = $q.defer();
		
		$http.get(jobUrl + '/job/appliedUsers/list/' + id)
			.then(function(response){
					console.log('In Job Factory getJoinedUsers Response!');
					deferred.resolve(response.data);
				},
			function(errResponse){
					console.error('In Job Factory getJoinedUsers errResponse!');
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	
	// function to delete Job
	function deleteJob(jobid) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/delete/job/' + jobid)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In adminFactory deleteJob Response!');
				},
			function(errResponse){
					deferred.reject(errReponse.data);
					console.error('In adminFactory deleteJob errResponse!');
				}	
			);
		return deferred.promise;
	}
	
}]);