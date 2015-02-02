package java63.web03.control.json;

import java.util.HashMap;

import java63.web03.domain.Collabo;
import java63.web03.domain.Member;
import java63.web03.service.CollaboService;
import java63.web03.service.UserService;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("json.collaboControl")
@RequestMapping("/json/collabo")
public class CollaboControl {
  static final int PAGE_DEFAULT_SIZE = 5;
  
  /*@Autowired ProjectService     projectService;*/
  @Autowired CollaboService		collaboService;
  @Autowired ServletContext servletContext;
  @Autowired UserService		userService;
 
  @RequestMapping(value="/addCollabo", method=RequestMethod.POST)
  public Object add(Collabo collabo) throws Exception {  
    /*collaboService.add(collabo);*/
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }

  @RequestMapping("/deleteCollabo")
  public Object delete(int dPid, String dUid) throws Exception {
    HashMap<String, Object> auth = new HashMap<>();
    auth.put("dPid", dPid);
    auth.put("dUid", dUid);
    System.out.println("dpid = " + dPid + ", dUid = " + dUid);
    String myAuth = collaboService.Auth(auth);
    if(myAuth=="MASTER"){
    	System.out.println("MASTER");
    }else{
    	System.out.println("not MASTER");
    }
    collaboService.delete(auth);
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
    				  /*collaboService.getPname(uid);*/
	  /*session.setAttribute("loginUser", member);*/
    /*member = (Member) session.getAttribute("loginUser");*/
	 /*System.out.println(member.getUserId());*/
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("memberNo",memberNo);
    resultMap.put("collabos", collaboService.getlist(uid));
    
    System.out.println(resultMap.get("collabos") + "콜라보스");
    System.out.println("리턴전");
    return resultMap;
  }
  
  @RequestMapping("/updateCollabo")
  public Object update(Collabo collabo) throws Exception {
    collaboService.update(collabo);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    return resultMap;
  }
  
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












