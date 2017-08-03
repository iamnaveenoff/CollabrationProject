package com.niit.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.dao.BlogCommentDAO;
import com.niit.model.Blog;
import com.niit.model.BlogComment;



@Repository("blogCommentDAO")
@Transactional
public class BlogCommentDAOImpl implements BlogCommentDAO{

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public boolean addBlogComment(BlogComment blogComment) {
		try {
			sessionFactory.getCurrentSession().save(blogComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean updateBlogComment(BlogComment blogComment) {
		try {
			sessionFactory.getCurrentSession().update(blogComment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean deleteBlogComment(BlogComment blogcomment) {
		try {
			sessionFactory.getCurrentSession().delete(blogcomment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public BlogComment getBlogComment(int id) {
		
		return sessionFactory.getCurrentSession().get(BlogComment.class, id);
	}

	@Override
	public List<BlogComment> list(int id) {
		
		String selectQuery = "FROM BlogComment where blog= '"+id+"'";
		Query query = sessionFactory.getCurrentSession().createQuery(selectQuery);
		return query.list();
		
	}

	@Override
	public List<BlogComment> list() {
		
		String selectQuery = "FROM BlogComment";
		Query query = sessionFactory.getCurrentSession().createQuery(selectQuery);
		return query.list();
	}

	@Override
	public boolean deleteCommentByBlogId(Blog blogId) {
		
		try {
			sessionFactory.getCurrentSession().delete(blogId);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	

}
