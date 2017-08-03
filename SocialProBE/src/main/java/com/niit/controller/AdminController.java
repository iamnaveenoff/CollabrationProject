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

import com.niit.dao.BlogDAO;
import com.niit.dao.EventDAO;
import com.niit.dao.JobDAO;
import com.niit.dao.UserDAO;
import com.niit.model.Blog;
import com.niit.model.Events;
import com.niit.model.Job;
import com.niit.model.User;

@RestController
public class AdminController {

	@Autowired
	private UserDAO userDAO;

	@Autowired
	private BlogDAO blogDAO;

	@Autowired
	private EventDAO eventDAO;

	@Autowired
	private JobDAO jobDAO;
	
	
	// method for fetching the approved user list

	@RequestMapping(value = "/user/manage/list", method = RequestMethod.GET)
	public ResponseEntity<List<User>> fetchApprovedUsers() 
	{
		System.out.println("Starting of the method fetchApprovedUser list");
		
		List<User> userList = userDAO.list("APPROVED");
		
		return new ResponseEntity<List<User>>(userList,HttpStatus.OK);
	}
	
	// method for changing the user role
	
	@RequestMapping(value="/user/role/manage",method=RequestMethod.POST)
	public ResponseEntity<User> changeUserRole(@RequestBody User user)
	{
		System.out.println("Starting of the method changeUserRole!");
		
		userDAO.updateUser(user);
		
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	// method for fetching approved blog list by status
	
	@RequestMapping(value="/blog/manage/list",method=RequestMethod.GET)
	public ResponseEntity<List<Blog>> fetchApprovedBlogs()
	{
		System.out.println("Starting of the method fetchApprovedBlogs!");
		
		List<Blog> blogList = blogDAO.getBlogByStatus("APPROVED");
		
		return new ResponseEntity<List<Blog>>(blogList,HttpStatus.OK);
	}
	
	// method for fetching approved job list by status
	
	@RequestMapping(value="/job/manage/list",method=RequestMethod.GET)
	public ResponseEntity<List<Job>> fetchApprovedJobs()
	{
		System.out.println("Starting of the method fetchApprovedJobs!");
		
		List<Job> jobList = jobDAO.getJobByStatus("APPROVED");
		
		return new ResponseEntity<List<Job>>(jobList,HttpStatus.OK);
	}
	
	// method for fetching Approved Events by status
	
	@RequestMapping(value="/event/manage/list",method=RequestMethod.GET)
	public ResponseEntity<List<Events>> fetchApprovedEvents()
	{
		System.err.println("Starting of the method fetchApprovedEvents!");
		
		List<Events> eventList = eventDAO.getEventByStatus("APPROVED");
		
		return new ResponseEntity<List<Events>>(eventList,HttpStatus.OK);
	}
	
	
	// method for delete blog and blog comment
	@RequestMapping(value="/delete/blog/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Blog>  deleteBlog(@PathVariable("id") int id)
	{	
		System.out.println("Starting of the method delete Blog");
		Blog blog = blogDAO.getBlog(id);
		
		blogDAO.deleteBlog(blog);
		
		return new ResponseEntity<Blog>(blog,HttpStatus.OK);
		
	}
	
	//method to delete forum and Forum post
	/*@RequestMapping(value="/delete/forum/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Forum>  deleteForum(@PathVariable("id") int id)
	{	
		System.out.println("Starting of the method delete Forum");
		Forum forum = forumDAO.getForum(id);
		
		forumDAO.deleteForum(forum);
		
		return new ResponseEntity<Forum>(forum,HttpStatus.OK);
		
	}*/
	
	// method to delete events and eventjoined
	@RequestMapping(value="delete/event/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<Events> deleteEvent(@PathVariable("id") int id)
	{
		Events event = eventDAO.getEvent(id);
		eventDAO.deleteEvent(event);
		
		return new ResponseEntity<Events>(event,HttpStatus.OK);
	}

	
	// method to delete job and job applied
		@RequestMapping(value="delete/job/{id}",method=RequestMethod.DELETE)
		public ResponseEntity<Job> deleteJob(@PathVariable("id") int id)
		{
			Job job = jobDAO.getJob(id);
			jobDAO.deleteJob(job);
			
			return new ResponseEntity<Job>(job,HttpStatus.OK);
		}
	
}

















