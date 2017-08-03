package com.niit.config;

import java.io.File;


import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;


public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer{

	private int maxUploadSizeInMb = 5 * 1024 * 1024; // 5MB
	
	@Override
	protected Class<?>[] getRootConfigClasses() {
		
		return new Class[] {DBConfig.class, WebSocketConfig.class};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		
		return new Class[] {WebAppConfig.class};
	}

	@Override
	protected String[] getServletMappings() {
		
		return new String[] {"/"};
	}
	

	@Override
	protected void customizeRegistration(Dynamic registration) {
		
		// upload temp file will put here
		File uploadDirectory = new File(System.getProperty("java.io.tmpdir"));
		
		// register a MultipartConfigElement
		MultipartConfigElement multipartConfigElement = 
				new MultipartConfigElement(uploadDirectory.getAbsolutePath(),maxUploadSizeInMb,maxUploadSizeInMb*2,maxUploadSizeInMb/2);
				
		registration.setMultipartConfig(multipartConfigElement);
		super.customizeRegistration(registration);
	}

	
}
