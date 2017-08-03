package com.niit.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.niit.dao.EventJoinedDAO;
import com.niit.dao.ForumDAO;
import com.niit.dao.JobAppliedDAO;
import com.niit.dao.JobDAO;
import com.niit.dao.UserDAO;
import com.niit.model.Blog;
import com.niit.model.ContainModel;
import com.niit.model.EventJoined;
import com.niit.model.Events;
import com.niit.model.Forum;
import com.niit.model.Job;
import com.niit.model.JobApplied;
import com.niit.model.User;
import com.niit.model.UserModel;

@RestController
public class UserController {
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private EventDAO eventDAO;
	
	@Autowired
	private JobDAO jobDAO;
	
	@Autowired
	private BlogDAO blogDAO;
	
	@Autowired
	private EventJoinedDAO eventJoinedDAO;
	
	@Autowired
	private JobAppliedDAO jobAppliedDAO;
	
	@Autowired
	private ForumDAO forumDAO;
		
	
	private static Logger log= LoggerFactory.getLogger(UserController.class);
	
	// method to get list of user by status ="APPROVED"
	
	@RequestMapping(value="users/list",method=RequestMethod.GET)
	public ResponseEntity<List<User>> fetchUser()
	{
		System.out.println("Fetching the all user List By status is Approved!");
		
		List<User> user = userDAO.list("APPROVED");
		
		System.out.println(user);
		
		return new ResponseEntity<List<User>>(user,HttpStatus.OK);
	}
	
	// method to create a new User
	
	@RequestMapping(value="/register", method=RequestMethod.POST)
	public ResponseEntity<User> createUser(@RequestBody User user)
	{
		System.out.println("You are Going to register!");
		log.debug("Satrting of the method register");
		user.setStatus("PENDING");
		user.setEnabled(true);
		user.setOnline(true);
		user.setProfile("noDp.jpg");
		user.setRole("User");
		
		userDAO.addUser(user);
		log.info("Register Sucessfully!"+user);
		System.out.println(user);
		
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	// method to update a existing user
	@RequestMapping(value="/update/{id}",method=RequestMethod.PUT)
	public ResponseEntity<User> updateUser(@PathVariable("id") int id,@RequestBody User user)
	{
		User currentUser = userDAO.getUser(id);
		currentUser.setStatus("APPROVED");
		currentUser.setRole("Super_Admin");
		userDAO.updateUser(currentUser);
		
		return new ResponseEntity<User>(currentUser,HttpStatus.OK);
	}
	
	// method to delete user
	/*@RequestMapping(value="/delete/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<User> deleteUser(@PathVariable("id") int id)
	{
		User user = userDAO.getUser(id);
		userDAO.deleteUser(user);
		
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}*/
	
	//method to validate user or for login
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public ResponseEntity<User> validateUser(@RequestBody User user)
	{
		log.debug("starting of the method login");
		
		if(user.getUsername() != null && user.getPassword() != null)
		{
			log.debug("In Login method if username and password not null");
			if(userDAO.validateUser(user) == null)
			{
				log.debug("Starting of the method validate");
				user = new User();
				user.setErrCode("204");
				user.setErrMessage("Invalid Credentials");
				log.debug("Invalid Credentials Give Valid Credentials");
				return new ResponseEntity<User>(user,HttpStatus.NO_CONTENT);
			}
			else
			{
				user = userDAO.getUserByUserName(user.getUsername());
				Boolean status = Boolean.valueOf("true");
				user.setOnline(status);
				user.setErrCode("200");
				user.setErrMessage("You are Login Successfully!");
				userDAO.updateUser(user);
				log.debug("You are Successfully Login!");
				return new ResponseEntity<User>(user,HttpStatus.OK);
			}
		}
		else
		{
			user = new User();
			log.debug("No Content availabel, Please give the username and passsword ");
			return new ResponseEntity<User>(user,HttpStatus.NO_CONTENT);
		}
	}
	
	// method to get user by user name
	@RequestMapping(value="/checkUser",method=RequestMethod.POST)
	public ResponseEntity<Void> checkUser(@RequestBody User username)
	{
		log.debug("starting of the Method CheckUser by Username");
		User exitingUser = userDAO.getUserByUserName(username.getUsername());
		if (exitingUser == null)
		{
			log.debug("UserName does not exits");
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
		} 
		else 
		{
			log.info("Username is "+username);
			log.debug("Username already exist in database");
			return new ResponseEntity<Void>(HttpStatus.FOUND);
		}
	}
	
	// method to log out user and set online false
	@RequestMapping(value="/logout", method=RequestMethod.POST)
	public ResponseEntity<Void> toLogout(@RequestBody User user)
	{
		log.debug("Starting of the method Log out");
		user.setOnline(false);
		userDAO.updateUser(user);
		log.debug("Ending of the method Logout");
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	// Function to fetch User Details
	@RequestMapping(value = "user/{id}",method = RequestMethod.GET)
	public ResponseEntity<UserModel> fetchUser(@PathVariable("id") int id) {
		
		// Setting user Inside model
		log.debug("Setting the User Inside UserModel");
		
		UserModel userModel = new UserModel();
		User user = userDAO.getUser(id);
		userModel.setUser(user);
		
		// setting List of events created by user inside model
		log.debug("Setting the List Of Events created by user Inside UserModel");
		
		List<Events> events = eventDAO.getUsersEvents(id);
		userModel.setEvents(events);
		
		// setting list of job created by user inside model
		log.debug("Setting the List Of Job created by user Inside UserModel");
		
		List<Job> job = jobDAO.getUsersJob(id);
		userModel.setJob(job);
		
		// setting list of blog created by user inside model
		log.debug("Setting the List Of blog created by user Inside UserModel");
		
		List<Blog> blog = blogDAO.getUsersBlog(id);
		userModel.setBlog(blog);
		
		// setting list of events user has been joined inside model
		log.debug("Setting the List Of Events Joined by user Inside UserModel");
		
		List<EventJoined> eventJoined = eventJoinedDAO.list(id);
		List<Events> joinedEvents = new ArrayList<>();
		for (EventJoined ej : eventJoined) {
			joinedEvents.add(ej.getEvents());
		}
		userModel.setJoinedEvents(joinedEvents);
		
		// setting list of jobs user has applied for inside model
		log.debug("Setting the List Of Job applied by user Inside UserModel");
		
		List<JobApplied> jobApplieds = jobAppliedDAO.list(id);
		List<Job> appliedJobList  = new ArrayList<>();
		for (JobApplied ja : jobApplieds) {
			appliedJobList.add(ja.getJob());
		}
		userModel.setAppliedJobList(appliedJobList);
		
		log.debug("Ending of the method Setting User inside UserModel");
		
		return new ResponseEntity<UserModel>(userModel,HttpStatus.OK);
	}
	
	// function to fetch main page contain
	@RequestMapping(value="/main/contain", method=RequestMethod.GET)
	public ResponseEntity<ContainModel> fetchContain() {
		
		log.debug("Starting of the function to fetch the main page content");
		ContainModel containModel = new ContainModel();
		
		log.debug("Starting of the method Fetching top5Blogs");
		List<Blog> top5Blogs = blogDAO.mainList();
		containModel.setTop5Blogs(top5Blogs);
		
		log.debug("Starting of the method Fetching top3Forums");
		List<Forum> top3Forums = forumDAO.mainList();
		containModel.setTop3Forums(top3Forums);
		
		log.debug("Starting of the method Fetching top3Jobs");
		List<Job> top3Jobs = jobDAO.mainList();
		containModel.setTop3Jobs(top3Jobs);
		
		log.debug("Starting of the method Fetching top3Events");
		List<Events> top3Events = eventDAO.mainList();
		containModel.setTop3Events(top3Events);
		
		log.debug("Ending of the function to fetch the main page content");
		
		return new ResponseEntity<ContainModel>(containModel,HttpStatus.OK);
 	}
	
	// function to fetch my online friends
	@RequestMapping(value="my/online/friends/{id}",method=RequestMethod.GET)
	public ResponseEntity<List<User>> fetchOnlineFriends(@PathVariable("id") int userId) {
		
		log.debug("Starting of the method fetchOnlineFriends");
		
		List<User> users = userDAO.fetchOnlineFriends(userId);
		List<User> onlineFriends = new ArrayList<>();
		for (User user1 : users) {
			if (user1.getId() != userId) {
				onlineFriends.add(user1);
			}
		}
		log.debug("Ending of the method fetchOnlineFriends");
		
		return new ResponseEntity<List<User>>(onlineFriends,HttpStatus.OK);
	}
	
	
}

