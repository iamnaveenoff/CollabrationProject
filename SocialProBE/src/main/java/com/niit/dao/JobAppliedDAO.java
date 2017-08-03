package com.niit.dao;

import java.util.List;

import com.niit.model.JobApplied;



public interface JobAppliedDAO {

	// add job applied
	boolean addJobApplied(JobApplied jobApplied);
	
	// update job applied
	boolean updateJobApplied(JobApplied jobApplied);
	
	// delete job applied
	boolean deleteJobApplied(JobApplied jobApplied);
	
	// get the applied job
	JobApplied getAppliedJob(int id);
	
	// list of job applied by user id
	List<JobApplied> list(int id);
	
	//list of job applied
	List<JobApplied> list();
	
	// get list jobApplied  by jobid
	List<JobApplied> listByJobId(int jobId);
}
