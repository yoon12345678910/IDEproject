package java63.web03.service;

import java.util.HashMap;
import java.util.List;

import java63.web03.dao.CollaboDao;
import java63.web03.domain.Collabo;
import java63.web03.domain.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CollaboService {
	@Autowired CollaboDao collaboDao;
	
	@Transactional(
		      rollbackFor=Exception.class, 
		      propagation=Propagation.REQUIRED)
		  public void add(int pid,String uid) {
		HashMap<String, Object> colla = new HashMap<>();
		colla.put("pid", pid);
		colla.put("uid", uid);
		collaboDao.collaboinsert(colla);
		  }
	@Transactional(
		      rollbackFor=Exception.class, 
		      propagation=Propagation.REQUIRED)
		  public void padd(Project project) {
		    collaboDao.projectInsert(project);
		  }
	
	
	
	
	@Transactional(
		      rollbackFor=Exception.class, 
		      propagation=Propagation.REQUIRED)
		  public void update(Collabo collabo) {
		    collaboDao.collaboupdate(collabo);
		  }
	 @Transactional(
		      rollbackFor=Exception.class, 
		      propagation=Propagation.REQUIRED)
		  public void delete(HashMap<String, Object> auth) {
		    collaboDao.collabodelete(auth);
		  }
	
	
	
	
	public List<?> getlist(String uid){
		System.out.println("getlist 내부2");
		return collaboDao.collaboProject(uid);
		
	}
	 public int member(String uid) {
		 System.out.println(uid + "service");
		    int totalMember = collaboDao.totalMember(uid);
		    System.out.println(totalMember);
		    return totalMember;
		  }
	 
	 public String getPname(String uid) {
		    String pName = collaboDao.projectName(uid);
		    return pName;
		  }
	 public String Auth(HashMap<String, Object> auth) {
		    String myAuth = collaboDao.myAuth(auth);
		    return myAuth;
		  }
	 
	 
	 
}
