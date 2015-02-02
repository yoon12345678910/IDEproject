package java63.web03.dao;

import java.util.HashMap;
import java.util.List;

import java63.web03.domain.Collabo;
import java63.web03.domain.Project;


public interface CollaboDao {
	/*Collabo selectOne(int no);*/
	/*void collaboselectProject(Collabo collabo);*/
	void projectInsert(Project project);
	void collaboinsert(HashMap<String, Object> collabo);
	void collaboupdate(Collabo collabo);
	void collabodelete(HashMap<String, Object> auth);
	List<?> collaboProject(String uid);
	int totalMember(String uid);
	String projectName(String uid);
	String myAuth(HashMap<String,Object> auth);
}
