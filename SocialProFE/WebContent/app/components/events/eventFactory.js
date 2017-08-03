var event= angular.module('eventModule',[]);

event.factory('eventFactory',['$http','$q','$routeParams', function($http,$q,$routeParams) {
	
	// For linking backend project with front end
	var eventUrl = 'http://localhost:8081/SocialProBE/';
	
	return {
		addEvent : addEvent,
		eventlist : eventlist,
		joinEvent : joinEvent,
		viewEvent : viewEvent,
		getParticipatedUsers : getParticipatedUsers,
		deleteEvent : deleteEvent
	};
	
	// Function to add Event
	function addEvent(event) {
		
		var deferred = $q.defer();
		
		$http.post(eventUrl + '/events/new/',event)
			.then(function(response){
					console.log('In eventFactory AddEvent Response!')
					deferred.resolve(response.data);
				},
			function(errResponse){
					console.log('In eventFactory AddEvent errReponse!!')
					deferred.reject(errResponse.data);
				}	
			);
		return deferred.promise;
	}
	
	
	// Function to get the list of events
	function eventlist() {
		
		var deferred = $q.defer();
		
		$http.get(eventUrl + '/events/list/status/')
			.then(function(response){
					deferred.resolve(response.data);
					console.log('IN EventList Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In EventLIst errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
	// Function to join event
	function joinEvent() {
		
		var deferred = $q.defer();
		var id = user;
		var eventId = $routeParams.id;
		
		$http.post(eventUrl + '/event/join/'+ eventId,id)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In JoinEvent Response!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('In JoinEvent errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	//  function to view Event
	function viewEvent(id) {
		
		var deferred = $q.defer();
		
		$http.get(eventUrl +'/event/' + id)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('Sucessfully fetched the single event!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('Failed to fetch the single event!');
				}	
			);
		return deferred.promise;
	}
	
	// Function to fetch the event participated
	function getParticipatedUsers(id) {
		
		var deferred = $q.defer();
		
		$http.get(eventUrl + '/event/participatedUsers/list/' + id)
			.then(function(response){
				deferred.resolve(response.data);
				console.log('Sucessfully Fetched participant of the Event!');
				},
			function(errResponse){
					deferred.reject(errResponse.data);
					console.error('Failed to fetched participant of eventt!');
				}	
			);
		return deferred.promise;
		
	}	
	
	// function to delete Event
	function deleteEvent(eventid) {
		
		var deferred = $q.defer();
		
		$http.post(url + '/delete/event/' + eventid)
			.then(function(response){
					deferred.resolve(response.data);
					console.log('In adminFactory deleteEvent Response!');
				},
			function(errResponse){
					deferred.reject(errReponse.data);
					console.error('In adminFactory deleteEvent errResponse!');
				}	
			);
		return deferred.promise;
	}
	
	
	
}]);