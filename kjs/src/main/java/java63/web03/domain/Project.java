package java63.web03.domain;

import java.io.Serializable;
import java.util.Date;

public class Project implements Serializable{
	private static final long serialVersionUID = 1L;
	protected int	      pid;
	protected String    pname;
	protected Date      pdate;
	protected String    pmemo;
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}

	
	public Date getPdate() {
		return pdate;
	}
	public void setPdate(Date pdate) {
		this.pdate = pdate;
	}
	public String getPmemo() {
		return pmemo;
	}
	public void setPmemo(String pmemo) {
		this.pmemo = pmemo;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	@Override
	public String toString() {
		return "Project [pid=" + pid + ", pname=" + pname + ", pdate=" + pdate
				+ ", pmemo=" + pmemo + "]";
	}
	
}
