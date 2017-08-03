package com.niit.daoimpl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.dao.FriendsDAO;
import com.niit.model.Friends;
import com.niit.model.User;

@Repository("friendsDAO")
@Transactional
public class FriendsDAOImpl implements FriendsDAO {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public boolean addFriend(Friends friends) {
		
		try {
			sessionFactory.getCurrentSession().save(friends);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean updateFriend(Friends friends) {
		
		try {
			sessionFactory.getCurrentSession().update(friends);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean deleteFriend(Friends friends) {
		
		try {
			sessionFactory.getCurrentSession().delete(friends);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Friends getFriend(int id) {
		
		return sessionFactory.getCurrentSession().get(Friends.class, id);
	}

	@Override
	public List<Friends> list() {
		
		String selectQuery = "FROM Friends";
		Query query = sessionFactory.getCurrentSession().createQuery(selectQuery);
		return query.list();
	}

	@Override
	public List<Friends> list(int id) {
		
		String selectQuery = "FROM Friends where friendId = :id";
		Query query = sessionFactory.getCurrentSession().createQuery(selectQuery);
		query.setParameter("id", id);
		return query.list();
	}

	@Override
	public List<Friends> list(String status) {
		
		String selectQuery = "FROM Friends where status = '" + status +"'";
		Query query = sessionFactory.getCurrentSession().createQuery(selectQuery);
		return query.list();
	}

	@Override
	public List<User> myFriends(int id) {
		
		String selectQuery = "SELECT * FROM USER_DETAILS WHERE USER_ID IN "
				+ "(SELECT INITIATOR_ID FROM FRIENDS_LIST WHERE (FRIEND_ID = :id) AND STATUS = 'APPROVED'"
				+ " UNION SELECT FRIEND_ID FROM FRIENDS_LIST WHERE (INITIATOR_ID = :id) AND STATUS = 'APPROVED')";
		return sessionFactory
				.getCurrentSession()
				.createNativeQuery(selectQuery, User.class)
				.setParameter("id", id)
				.getResultList();
	}

	@Override
	public List<User> noFriends(int id) {
		
		String selectQuery = "SELECT * FROM USER_DETAILS WHERE USER_ID NOT IN "
				+ "(SELECT INITIATOR_ID FROM FRIENDS_LIST WHERE FRIEND_ID = :id OR INITIATOR_ID = :id "
				+ "UNION SELECT FRIEND_ID FROM FRIENDS_LIST WHERE FRIEND_ID = :id OR INITIATOR_ID = :id) AND STATUS = 'APPROVED'";
		return sessionFactory
				.getCurrentSession()
				.createNativeQuery(selectQuery, User.class)
				.setParameter("id", id)
				.getResultList();
	}

	/*@Override
	public Friends getFriendsStatus(int initiatorId, int friendId) {
		
		String selectQuery = "SELECT from Friends Where initiatorId = :initiatorId  and  friendId = :friendId";
		Query query = sessionFactory.getCurrentSession().createQuery(selectQuery);
		query.setParameter("initiatorId", initiatorId);
		query.setParameter("friendId", friendId);
		query.getSingleResult();
		return  (Friends) query;
	}*/

	/*@Override
	public Friends getFriendByStatus(int initiatorId,int friendId ) {
		String selectQuery = "SELECT from Friends Where FriendId = :id and ";
		Query query = sessionFactory.getCurrentSession().createQuery(selectQuery);
		query.setParameter("id", id);
		query.setParameter("status", "APPROVED");
		query.getSingleResult();
		return (Friends) query;
	}*/

}
