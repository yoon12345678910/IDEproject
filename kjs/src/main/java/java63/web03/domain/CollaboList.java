package java63.web03.domain;

import java.io.Serializable;

public class CollaboList implements Serializable {
	private static final long serialVersionUID = 1L;
	protected String    uid;
	  protected int    pid;
	  protected String       pname;
	@Override
	public String toString() {
		return "CollaboList [uid=" + uid + ", pid=" + pid + ", pname=" + pname
				+ "]";
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
}
