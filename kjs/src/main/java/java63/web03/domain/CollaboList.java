package java63.web03.domain;
   
import java.io.Serializable;
import java.util.Date;

public class CollaboList implements Serializable {
	private static final long serialVersionUID = 1L;
	protected String    uid;
	  protected int    pid;
	  protected String       pname;
	  protected String       auth;
	  protected String       pdate;
	  
	@Override
	public String toString() {
		return "CollaboList [uid=" + uid + ", pid=" + pid + ", pname=" + pname
				+ ", auth=" + auth + ", pdate=" + pdate + "]";
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getAuth() {
		return auth;
	}
	public void setAuth(String auth) {
		this.auth = auth;
	}
	public String getPdate() {
		return pdate;
	}
	public void setPdate(String pdate) {
		this.pdate = pdate;
	}
	
	
}
