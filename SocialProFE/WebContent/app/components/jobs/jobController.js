job.controller('jobController',['jobFactory','$timeout','$routeParams','$location','$route','$q',
	function(jobFactory,$timeout,$routeParams,$location,$route,$q) {
	
	// Setting the fields for creating a new Job
	// field name same as the in Entity or Domain or DTO class In Backend Project
	
	var self = this;
	
	self.job = {
			
			id : null,
			companyName : ' ',
			subTitle : ' ',
			about : ' ',
			jobProfile : ' ',
			qualification : ' ',
			contactInfo : ' ',
			postDate : ' ',
			userId : ' ',
			userName : ' '
	}
	
	// fetching the list of jobs
	self.joblist = [];
	
	// for viewing the single job
	self.singleJob = {};
	
	//setting the Creator of the job
	self.singleJobUser = [];
	
	// list of user applied for a particular job
	self.appliedUsers = [];
	
	// flag to see user is applied to the particular job or not
	self.isApplied = false;
	
	// flag to check the applied status
	self.isApproved = false;
	
	// for storing applied users status
	self.appliedUserStatus = "PENDING";
	
	// calling jQuery once controller has loaded
	$timeout(function () {
		setting();
	},100);
	
	// Method for Creating new Job
	self.addJob = function() {
		
		debugger;
		
		// setting the userId and username
		self.job.userId = user.id;
		self.job.userName = user.username;
		
		// calling the factory Method addJob
		jobFactory.addJob(self.job)
			.then(function(job){
					debugger;
					console.log('Sucessfully added new Job!');
					self.job = job;
					if(self.job.status == 'APPROVED'){
						Materialize.toast('Job Created Sucessfully!',2000)
					}else {
						Materialize.toast('Job Created Sucessfully! now Waiting for Admin Approval!',3000)
					}
					var jId = self.job.id;
					$location.path('/job/'+ jId);
				},
			function(errResponse){
					console.error('Sucessfully added new Job!');
				}	
			);
		
	}
	
	// Method to get the job list
	self.joblist = function() {
		debugger;
		
		jobFactory.joblist()
			.then(function(job){
					self.joblist = job;
					console.log('Sucessfully Fetched Job list!');
				},
			function(errResponse){
					console.error('Failed to Fetched Job list!');
				}	
			);
	}
	
	// Method for Apply to the job
	self.applyJob = function() {
		debugger;
		
		jobFactory.applyJob()
			.then(function(event){
					$route.reload();
					Materialize.toast('Sucessfully Applied for a Job!',3000);
					self.viewJob();
					console.log('Sucessfully  Applied for Job');
				},
			function(errResponse){
					console.error('Failed to Apply for a Job!');
				}	
			);
	}
	
	
	// Function to view Single job
	self.viewJob = function() {
		
		// first get list of users to applied for a job
		getAppliedUsers()
			.then(function(appliedUsers){
				// to store list of users applied already defined in array
				self.appliedUsers = appliedUsers;
				
				for(id in self.appliedUsers) {
					if(user.id == self.appliedUsers[id].userId) {
						self.isApplied = true;
						self.appliedUserStatus = self.appliedUsers[id].status;
						break;
					}
				}
				
				// if user is applied for job then set status
				if(self.appliedUserStatus == "APPROVED"){
					self.isApproved = true;
				}
				
				var jobId = $routeParams.id;
				jobFactory.viewJob(jobId)
					.then(function(jobModel){
							self.singleJob = jobModel.job;
							self.singleJobUser = jobModel.user;
							console.log('Sucessfully Fetched Single Job!');
						},
					function(errResponse){
							console.error('Failed to get the single Job!');
						}	
					);
				
			});
	}
	
	
	// function to fetch the list of users applied for a job
	function getAppliedUsers() {
		
		var deferred = $q.defer();
		var jobId = $routeParams.id;
		
		jobFactory.getAppliedUsers(jobId)
			.then(function(appliedUsers){
					deferred.resolve(appliedUsers);
				},
			function(errResponse){
					deferred.reject(errResponse);
				}	
			);
		return deferred.promise;
	}
	
	
	
	self.deleteJob = function() {
		
		var jobid = $routeParams.id;
		
		blogFactory.deleteJob(jobid)
			.then(function(job){
					console.log('sucessfully deleted Job!');
					$route.reload();
				},
			function(errResponse){
					console.error('Failed to delete Job!');
				}	
			);
	}
	
	
}]);