package java63.web03.domain;

import java.io.Serializable;

public class User implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected String    userId;
  protected String    password;
  protected String    email;
  protected String    gUrl;
  protected int	    ptName;
  protected String    pUrl;
		
  
		@Override
public String toString() {
	return "User [userId=" + userId + ", password=" + password + ", email="
			+ email + ", gUrl=" + gUrl + ", ptName=" + ptName + ", pUrl="
			+ pUrl + "]";
}
		public String getUserId() {
			return userId;
		}
		public void setUserId(String userId) {
			this.userId = userId;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getgUrl() {
			return gUrl;
		}
		public void setgUrl(String gUrl) {
			this.gUrl = gUrl;
		}
		public String getpUrl() {
			return pUrl;
		}
		public void setpUrl(String pUrl) {
			this.pUrl = pUrl;
		}
		public int getPtName() {
			return ptName;
		}
		public void setPtName(int ptName) {
			this.ptName = ptName;
		}
  
}











