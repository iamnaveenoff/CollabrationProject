package com.niit.controller;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.niit.dao.UserDAO;
import com.niit.model.User;
import com.niit.message.Response;

@RestController
@RequestMapping("/upload")
@PropertySource("classpath:config.properties")
public class UploadController {

	private static final Logger log = LoggerFactory.getLogger(UploadController.class);
	@Autowired
	private UserDAO userDAO;
	
	@Value("${imageBasePath}")
	private String imageBasePath;
	
	@PostMapping("/profile-picture")
	public ResponseEntity<Response> uploadProfilePicture(@RequestParam("file") MultipartFile file,@RequestParam("id") int id) {
		
		log.debug("Starting of the method UploadProfilePictre");
		
		String message = null;
		
		// we would be using the USER_PROFILE as a prefix so that we can use other prefix
		// for other kind of upload such as event which may have id auto-generated
		
		String fileName = "USER_PROFILE_" + id + ".jpg";
		
		if(uploadFile(imageBasePath,fileName,file)) {
			
			userDAO.updateUserProfile(fileName, id);
			
			// in the reponse the filename of the new image will be send
			return new ResponseEntity<Response>(new Response(1,fileName),HttpStatus.OK);
		}
		else {
			message = "Failed to update the profile picture!";
			return new ResponseEntity<Response>(new Response(0, message),HttpStatus.NOT_FOUND);
		}
	}
	
	/*
	 * uploadFile method has three parameters 
	 * directory - where to upload
	 * fileName - that will be used for naming the upload file
	 * file - the file to upload
	 */

	private boolean uploadFile(String directory, String fileName, MultipartFile file) {
		
		// create the directory if does not exists
		if(!new File(directory).exists()) {
			new File(directory).mkdirs();
		}
		try {
			// transfer the file
			file.transferTo(new File(directory+fileName));
			// file Upload SucessFully
			log.debug("File Uploaded Successfully!");
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			log.debug("Failed to UpdateFile");
		}
		return false;
	}
	
	// TO resolve ${} in @value
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
		
		return new PropertySourcesPlaceholderConfigurer();
	}
	
}
