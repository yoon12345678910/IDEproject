package java63.web03.domain;

import java.io.Serializable;

public class Collabo implements Serializable {
  private static final long serialVersionUID = 1L;

  protected String    uid;
  protected String    pid;
  protected String    auth;
@Override
public String toString() {
	return "Collabo [uid=" + uid + ", pid=" + pid + ", auth=" + auth + "]";
}
public String getUid() {
	return uid;
}
public void setUid(String uid) {
	this.uid = uid;
}
public String getPid() {
	return pid;
}
public void setPid(String pid) {
	this.pid = pid;
}
public String getAuth() {
	return auth;
}
public void setAuth(String auth) {
	this.auth = auth;
}
	
    
}
