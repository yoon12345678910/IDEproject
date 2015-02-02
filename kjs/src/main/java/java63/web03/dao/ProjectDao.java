package java63.web03.dao;

import java.util.HashMap;
import java.util.List;

import java63.web03.domain.Collabo;
import java63.web03.domain.Project;


public interface ProjectDao {
	void projectInsert(HashMap<String, Object> pro);
	int projectName(String pname);
	/*void collaboinsert(Collabo collabo);
	void collaboupdate(Collabo collabo);
	void collabodelete(Collabo collabo);
	List<?> collaboProject(String uid);
	int totalMember(String uid);
	String projectName(String uid);*/
}
