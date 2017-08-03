package com.niit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.niit.dao.ForumDAO;
import com.niit.dao.ForumRequestDAO;
import com.niit.dao.UserDAO;
import com.niit.model.Forum;
import com.niit.model.ForumRequest;
import com.niit.model.User;

@RestController
public class ForumRequestController {

	@Autowired
	private ForumRequestDAO forumRequestDAO;
	
	
	@Autowired
	private ForumDAO forumDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	// method to Join the Forum by passing forum id in url and user in body
	
	@RequestMapping(value="/forum/request/{id}",method=RequestMethod.POST)
	public ResponseEntity<ForumRequest> addForumRequest(@PathVariable("id") int id, @RequestBody User user)
	{
		System.out.println("Adding ForumRequest!");
		
		ForumRequest forumRequest = new ForumRequest();
		
		//Forum forum = null;
		
		user = userDAO.getUser(user.getId());
		
		forumRequest.setUserId(user.getId());
		forumRequest.setUserName(user.getUsername());
		
		Forum forum = forumDAO.getForum(id);
		forumRequest.setForum(forum);
		
		if (user.getRole().equals("Super_Admin") || user.getRole().equals("Admin"))
		{
			forumRequest.setStatus("APPROVED");
		} 
		else 
		{
			forumRequest.setStatus("PENDING");
		}
		
		forumRequestDAO.addForumRequest(forumRequest);
		
		System.out.println("Successfully added ForumRequest!");
		
		return new ResponseEntity<ForumRequest>(forumRequest,HttpStatus.OK);
		
	}
	
	/*@RequestMapping(value="/forum/request/{id}",method=RequestMethod.POST)
	public ResponseEntity<ForumRequest> addForumRequest(@PathVariable("id") int id, @RequestBody ForumRequest forumRequest)
	{
		System.out.println("Adding ForumRequest!");
		
		//ForumRequest forumRequest = new ForumRequest();
		
		//Forum forum = null;
		//User user = null;
		 
		//user = userDAO.getUser(id);
		//String userName = user.getUsername();
		
		//forumRequest.setUserId(id);
		//forumRequest.setUserName(userName);
		
		//forum = forumDAO.getForum(forumId);
		//forumRequest.setForum(forum);
		
		Forum forum = forumDAO.getForum(id);
		
		forumRequest.setForum(forum);
		
		int uId = forumRequest.getUserId();
		User user = userDAO.getUser(uId);
		
		forumRequest.setUserName(user.getUsername());
		
		if (user.getRole().equals("Super_Admin") || user.getRole().equals("Admin"))
		{
			forumRequest.setStatus("APPROVED");
		} 
		else 
		{
			forumRequest.setStatus("PENDING");
		}
		
		forumRequestDAO.addForumRequest(forumRequest);
		
		return new ResponseEntity<ForumRequest>(forumRequest,HttpStatus.OK);
		
	}*/
 	
	// getting the list of participated user
	
	@RequestMapping(value="/forum/participatedUsers/list/{id}",method=RequestMethod.GET)
	public ResponseEntity<List<ForumRequest>> fetchParicipatedUsers(@PathVariable("id") int id)
	{
		System.out.println("Fetching the list of users!");
		
		List<ForumRequest> forumRequests = forumRequestDAO.list(id);
		return new ResponseEntity<List<ForumRequest>>(forumRequests,HttpStatus.OK);
	}
}
