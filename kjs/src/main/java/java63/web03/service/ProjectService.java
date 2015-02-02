package java63.web03.service;

import java.util.Date;
import java.util.HashMap;
import java63.web03.dao.CollaboDao;
import java63.web03.dao.ProjectDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ProjectService {
	@Autowired ProjectDao projectDao;
	@Autowired CollaboDao collaboDao;
	
	@Transactional(
		      rollbackFor=Exception.class, 
		      propagation=Propagation.REQUIRED)
	 public int add(String pname,Date pdate) {
		HashMap<String, Object> pro = new HashMap<>();
		pro.put("pname",pname);
		pro.put("pdate",pdate);
		
		projectDao.projectInsert(pro);
		int pid = projectDao.projectName(pname);
		System.out.println("여긴왔니");
		return pid;
	
		
		
		  }
	
	/*
	
	
	@Transactional(
		      rollbackFor=Exception.class, 
		      propagation=Propagation.REQUIRED)
		  public void update(Project project) {
		projectDao.collaboupdate(project);
		  }
	 @Transactional(
		      rollbackFor=Exception.class, 
		      propagation=Propagation.REQUIRED)
		  public void delete(Project project) {
		 projectDao.collabodelete(project);
		  }
	*/
	
	
	
	 
	 
	 
}
