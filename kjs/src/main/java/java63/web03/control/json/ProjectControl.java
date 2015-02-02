package java63.web03.control.json;

import java.util.Date;
import java.util.HashMap;
import java63.web03.service.CollaboService;
import java63.web03.service.ProjectService;
import java63.web03.service.UserService;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("json.projectControl")
@RequestMapping("/json/project")
public class ProjectControl {
  static final int PAGE_DEFAULT_SIZE = 5;
  
  @Autowired ProjectService     projectService;
  @Autowired CollaboService		collaboService;
  @Autowired ServletContext servletContext;
  @Autowired UserService		userService;
 
  @RequestMapping(value="/addProject", method=RequestMethod.POST)
  public Object add(String pname, Date pdate,String uid) throws Exception {  
	 System.out.println(pname  + "  " + pdate  + "   "  + uid);
	  int pid = projectService.add(pname, pdate);
	  System.out.println("pid  = " + pid);
    collaboService.add(pid,uid);
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("pid",pid);
    
    return resultMap;
  }

 /* @RequestMapping("/deleteCollabo")
  public Object delete(Collabo collabo) throws Exception {
    collaboService.delete(collabo);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping(value="/listCollabo")
  public Object listCollabo(String uid) throws Exception {
	  System.out.println(uid);
	  Member member;
    int memberNo = collaboService.member(uid);
    System.out.println("control" + memberNo);
    				  collaboService.getPname(uid);
	  session.setAttribute("loginUser", member);
    member = (Member) session.getAttribute("loginUser");
	 System.out.println(member.getUserId());
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("memberNo",memberNo);
    resultMap.put("collabos", collaboService.getlist(uid));
    resultMap.put("", value);
    System.out.println();
    System.out.println("리턴전");
    return resultMap;
  }
  
  @RequestMapping("/updateProject")
  public Object update(Collabo collabo) throws Exception {
    collaboService.update(collabo);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    return resultMap;
  }
  */
 /* @RequestMapping("/view")
  public Object view(int no, Model model) throws Exception {
    Project project = projectService.get(no);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("project", project);
    resultMap.put("photos", project.getPhotoList());
    return resultMap;
  }*/
}












