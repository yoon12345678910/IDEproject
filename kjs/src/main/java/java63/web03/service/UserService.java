package java63.web03.service;

import java.util.HashMap;
import java63.web03.dao.UserDao;
import java63.web03.domain.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired UserDao userDao;
  
  public User validate(String userId, String password) {
    HashMap<String,String> params = new HashMap<>();
    params.put("userId", userId);
    params.put("password", password);
    return userDao.existUser(params);
  }
 /* @Transactional(
	      rollbackFor=Exception.class, 
	      propagation=Propagation.REQUIRED)
	  public void add(USER user) {
	  userDao.insert(user);
	    
	    if (project.getPhoto() != null) {
	      projectDao.insertPhoto(project);
	    }
	  }*/
/*  @Transactional(
	      rollbackFor=Exception.class, 
	      propagation=Propagation.REQUIRED)
	  public void delete(Project project) {
	    userDao.(project);
	  }*/
  

}














