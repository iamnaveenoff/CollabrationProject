package com.niit.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.niit.dao.EventDAO;
import com.niit.dao.EventJoinedDAO;
import com.niit.dao.UserDAO;
import com.niit.model.EventJoined;
import com.niit.model.EventModel;
import com.niit.model.Events;
import com.niit.model.Job;
import com.niit.model.User;

@RestController
public class EventController {

	@Autowired
	private EventDAO eventDAO;
	
	@Autowired
	private EventJoinedDAO eventJoinedDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	// method for create event
	
	@RequestMapping(value="/events/new", method=RequestMethod.POST)
	public ResponseEntity<Events> addEvents(@RequestBody Events events)
	{
		System.out.println("Starting of the method AddEvents!");
		
		int id = events.getUserId();
		User user = userDAO.getUser(id);
		events.setUserName(user.getUsername());
		
		if (user.getRole().equals("Super_Admin") || user.getRole().equals("Admin"))
		{
			events.setStatus("APPROVED");
		} 
		else 
		{
			events.setStatus("PENDING");
		}
		
		DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDateTime now = LocalDateTime.now();
		
		events.setPostDate(LocalDate.parse(dateFormat.format(now)));
		
		eventDAO.addEvent(events);
		
		return new ResponseEntity<Events>(events,HttpStatus.OK);
	}
	
	// method for fetching the list of event
	
	@RequestMapping(value="/events/list/status", method=RequestMethod.GET)
	public ResponseEntity<List<Events>> fetchApprovedEvents(String status)
	{
		System.out.println("Starting of the method fetchApprovedEvenrts!");
		
		List<Events> eventsList = eventDAO.getEventByStatus("APPROVED");
		
		return new ResponseEntity<List<Events>>(eventsList,HttpStatus.OK);
	}
	
	// method for fetching the list of events by user
	
	@RequestMapping(value="/user/events/list/{id}",method=RequestMethod.GET)
	public ResponseEntity<List<Events>> fetchUserEvents(@PathVariable("id") int id)
	{
		System.out.println("Starting of the method fetchUserEvents!");
		
		List<Events> eventsList = eventDAO.getUsersEvents(id);
		
		return new ResponseEntity<List<Events>>(eventsList,HttpStatus.OK);
	}
	
	// method for join the event by passing event id in url and user in body
	
	@RequestMapping(value="/event/join/{id}",method=RequestMethod.POST)
	public ResponseEntity<EventJoined> joinEvent(@PathVariable("id") int id,@RequestBody User user)
	{
		System.out.println("Starting of the method joinEvent!");
		
		EventJoined eventJoined = new EventJoined();
		
		user = userDAO.getUser(user.getId());
		
		eventJoined.setUserId(user.getId());
		eventJoined.setUserName(user.getUsername());
		
		Events events = eventDAO.getEvent(id);
		
		eventJoined.setEvents(events);
		
		DateTimeFormatter dateFormat =  DateTimeFormatter.ofPattern("yyy-MM-dd");
		LocalDateTime now = LocalDateTime.now();
		
		eventJoined.setJoinedDate(LocalDate.parse(dateFormat.format(now)));
		
		eventJoined.setStatus("APPROVED");
		
		eventJoinedDAO.addEventJoined(eventJoined);
		
		System.out.println("You are evnet joined Successfiully!");
		
		return new ResponseEntity<EventJoined>(eventJoined,HttpStatus.OK);
	}
	
	/*@RequestMapping(value="/event/join/{id}",method=RequestMethod.POST)
	public ResponseEntity<EventJoined> joinEvent(@PathVariable("id") int id,@RequestBody EventJoined eventJoined)
	{
		System.out.println("Starting of the method joinEvent!");
		
		Events events = eventDAO.getEvent(id);
		//User user = userDAO.getUser(userId);
		
		int uId = eventJoined.getUserId();
		User user = userDAO.getUser(uId);
		
		eventJoined.setUserName(user.getUsername());
		
		//EventJoined eventJoined = new EventJoined();
		
		DateTimeFormatter dateFormat =  DateTimeFormatter.ofPattern("yyy-MM-dd");
		LocalDateTime now = LocalDateTime.now();
		
		eventJoined.setJoinedDate(LocalDate.parse(dateFormat.format(now)));
		eventJoined.setEvents(events);
		//eventJoined.setUserId(userId);
		//eventJoined.setUserName(user.getUsername());
		eventJoined.setStatus("APPROVED");
		
		eventJoinedDAO.addEventJoined(eventJoined);
		
		return new ResponseEntity<EventJoined>(eventJoined,HttpStatus.OK);
	}*/
	
	@RequestMapping(value="/event/{id}", method=RequestMethod.GET)
	public ResponseEntity<EventModel> viewEvent(@PathVariable("id") int id){
		
		EventModel eventModel = new EventModel();
		Events event = eventDAO.getEvent(id);
		User user = userDAO.getUser(event.getUserId());
		
		eventModel.setEvents(event);
		eventModel.setUser(user);
		
		return new ResponseEntity<EventModel>(eventModel,HttpStatus.OK);
	}
	
	// getting the list of participated for event
	@RequestMapping(value="/event/participatedUsers/list/{id}", method=RequestMethod.GET)
	public ResponseEntity<List<EventJoined>> fetchParticipatedUsers(@PathVariable("id") int id)
	{
		List<EventJoined> eventJoined = eventJoinedDAO.listByEventId(id);
		return new ResponseEntity<List<EventJoined>>(eventJoined, HttpStatus.OK);
	}
	
	// method to update event
	@RequestMapping(value="/event/update/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Events> updateEvent(@PathVariable int id, @RequestBody Job job)
	{
		Events currentEvent = eventDAO.getEvent(id);
		currentEvent.setStatus("APPROVED");
		eventDAO.updateEvent(currentEvent);
		
		return new ResponseEntity<Events>(currentEvent,HttpStatus.OK);
	}
}
