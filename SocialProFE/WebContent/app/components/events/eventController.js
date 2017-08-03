event.controller('eventController',
		[
			'eventFactory','$timeout','$cookies','$routeParams','$location','$route','$q',
			function(eventFactory,$timeout,$cookies,$routeParams,$location,$route,$q) {
			
				// Setting the fields for Creating a new Event 
				// field name same as the name in Entity or Domain or DTO class in project backend
				
				var self = this;
				
				self.event = {
						
						id : null,
						name : ' ',
						venue : ' ',
						description : ' ',
						startDate : ' ',
						endDate : ' ',
						postDate : ' ',
						userId : ' ',
						userName : ' '
				}
				
				// fetching list of events
				self.eventlist = [];
				
				// for viewing the single event
				self.singleEvent = {};
				
				// setting the creator of the event
				self.singleEventUser = [];
				
				//list users joined for events
				self.participatedUsers = [];
				
				// flag to see user is participant or not
				self.isParticipant = false;
				
				// flag to check joining status
				self.isApproved = false;
				
				// for storing participant status
				self.participantStatus = "PENDING";
				
				
				// calling jQuery once controller has loaded
				$timeout(function () {
					setting();
				}, 100);
				
				// Method for Creating new Event
				self.addEvent = function() {
					
					debugger;
					
					// setting date format for start date and end date
					var startDate = new Date(self.event.startDate).toISOString().slice(0,10);
					self.event.startDate = startDate;
					
					var endDate = new Date(self.event.endDate).toISOString().slice(0,10);
					self.event.endDate = endDate;
					
					// setting userId and UserName
					self.event.userId = user.id;
					self.event.userName = user.username;
					
					// calling Factory method
					eventFactory.addEvent(self.event)
						.then(function(event){
								debugger;
								self.event = event;
								if(self.event.status == 'APPROVED'){
									Materialize.toast('Event Created Sucessfully!',2000)
								}else {
									Materialize.toast('Event Created Sucessfully! now Waiting for Admin Approval!',3000)
								}
								var eId = self.event.id;
								//$location.path('/events/list');
								$location.path('/event/'+eId);
								console.log('Successfully Added Event!');
							},
						function(errResponse){
								console.error('Failed TO addEvent!');
							}	
						);
					
				}
				
				// Method to get Event List
				self.eventlist = function() {
					
					debugger;
					
					eventFactory.eventlist()
						.then(function(events){
								self.eventlist = events;
								console.log('Successfully Fetched the list of Events!');
							},
						function(errResponse){
								console.error('Failed to fetch the list of Events!')
							}	
						);
				}
				
				
				// Method to join event
				self.joinEvent = function() {
					
					debugger;
					eventFactory.joinEvent()
						.then(function(event){
								$route.reload();
								Materialize.toast('Sucessfully Joined Event!',3000);
								self.viewEvent();
								console.log('Sucessfully  joined  Event');
							},
						function(errResponse){
								console.error('Failed to sent Request to join event!');
							}	
						);
					
				}
				
				
			
				// Method to view the single event
				self.viewEvent = function() {
					
					//First get the list of users to EventJoined
					getParticipatedUsers()
						.then(function(participatedUsers){
								// to store list of participated users already defined in array
								self.participatedUsers = participatedUsers;
								
								for(id in self.participatedUsers) {
									if(user.id == self.participatedUsers[id].userId) {
										self.isParticipant = true;
										self.participantStatus = self.participatedUsers[id].status;
										break;
									}
								}
								
								// if user is joined for event then set status
								if(self.participantStatus == "APPROVED"){
									self.isApproved = true;
								}
								
								var eventId = $routeParams.id;
								eventFactory.viewEvent(eventId)
									.then(function(eventModel){
											self.singleEvent = eventModel.events;
											self.singleEventUser = eventModel.user;
											console.log('Successfully Fetched the Single Event!');
										},
									function(errResponse){
											console.error('Failed to get the single Event!');
										}	
									);
								
							}
						);
					
				}
					
					/*var eventId = $routeParams.id;
					eventFactory.viewEvent(eventId)
						.then(function(eventModel){
								self.singleEvent = eventModel.events;
								self.singleEventUser = eventModel.user;
								console.log('Successfully Fetched the Single Event!');
							},
						function(errResponse){
								console.error('Failed to get the single Event!');
							}	
						);}*/
				
				
				// function to fetch the list of participant users
				function getParticipatedUsers() {
					
					var deferred = $q.defer();
					var eventId = $routeParams.id;
					
					eventFactory.getParticipatedUsers(eventId)
						.then(function(participatedUsers){
								deferred.resolve(participatedUsers);
							},
						function(errResponse){
								deferred.reject(errResponse);
							}	
						);
					return deferred.promise;
				}
				
				
				self.deleteEvent = function() {
					
					var eventid = $routeParams.id;
					
					blogFactory.deleteEvent(eventid)
						.then(function(event){
								console.log('sucessfully deleted Event!');
								$route.reload();
							},
						function(errResponse){
								console.error('Failed to delete Event!');
							}	
						);
				}
				
			}
		]);