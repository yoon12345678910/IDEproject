package java63.web03.control.json;

import java.util.HashMap;
import java63.web03.domain.User;
import java63.web03.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("json.authControl") 
@RequestMapping("/json/auth") 
public class AuthControl {
  @Autowired UserService userService;
  
  @RequestMapping(value="/loginUser", method=RequestMethod.GET)
  public Object loginUser(HttpSession session) throws Exception {
    HashMap<String,Object> resultMap = new HashMap<>();
    
    if (session.getAttribute("loginUser") != null) {
      resultMap.put("status", "success");
      resultMap.put("loginUser", session.getAttribute("loginUser"));
    } else {
      resultMap.put("status", "fail");
    }
    
    return resultMap;
  }
  
  @RequestMapping(value="/login", method=RequestMethod.POST)
  public Object login(
      String uid, 
      String pwd, 
      boolean save,
      String requestUrl, /* 세션에 저장된 값을 달라고 하려면?*/
      HttpServletResponse response,
      HttpSession session) throws Exception {

    if (save) { // 쿠키로 아이디 저장
      Cookie cookie = new Cookie("uid", uid);
      cookie.setMaxAge(60 * 60 * 24 * 15);
      response.addCookie(cookie);
      System.out.println("쿠키에 넣었음.save");
      
    } else {
      Cookie cookie = new Cookie("uid", "");
      cookie.setMaxAge(0); // 무효화시킴
      response.addCookie(cookie);
      System.out.println("쿠키에 넣었음.else");
    }
    
    User user = userService.validate(uid, pwd);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    
    if (user != null) {
      resultMap.put("status", "success");
      session.setAttribute("loginUser", user);
    } else {
      session.invalidate();
      resultMap.put("status", "fail");
    }
    
    return resultMap;
  }
  
  @RequestMapping("/logout")
  public Object execute(HttpSession session) throws Exception {
    session.invalidate();
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    return resultMap;
  }

}












