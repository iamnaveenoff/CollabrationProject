package com.niit.dao;

import java.util.List;

import com.niit.model.Job;



public interface JobDAO {

	// add job- by admin
	boolean addJob(Job job);
	
	// update job- by admin
	boolean updateJob(Job job);
	
	// delete Job- by admin
	boolean deleteJob(Job job);
	
	// get the job by id
	Job getJob(int id);
	
	// list of job- by admin
	List<Job> list();
	
	// list of job  by user id
	List<Job> getUsersJob(int id);
	
	// list of job by  status- by admin
	List<Job> getJobByStatus(String status);
	
	// list job  by order 
	// Student /Alumni get All vacant jobs from the Rest controller send status = 'v'
	List<Job> mainList();
}
