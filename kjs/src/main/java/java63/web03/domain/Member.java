package java63.web03.domain;

import java.io.Serializable;

public class Member implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected String    userId;
  protected String    password;
  protected String    email;
  protected String    userName;
  protected String    tel;
  protected String    fax;
  protected String    postNo;
  protected String    baseAddress;
  protected String    detailAddress;
  protected String    photo;
  
  @Override
  public String toString() {
    return "Member [userId=" + userId + ", password=" + password + ", email="
        + email + ", userName=" + userName + ", tel=" + tel + ", fax=" + fax
        + ", postNo=" + postNo + ", baseAddress=" + baseAddress
        + ", detailAddress=" + detailAddress + ", photo=" + photo + "]";
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
  public String getUserName() {
    return userName;
  }
  public void setUserName(String userName) {
    this.userName = userName;
  }
  public String getTel() {
    return tel;
  }
  public void setTel(String tel) {
    this.tel = tel;
  }
  public String getFax() {
    return fax;
  }
  public void setFax(String fax) {
    this.fax = fax;
  }
  public String getPostNo() {
    return postNo;
  }
  public void setPostNo(String postNo) {
    this.postNo = postNo;
  }
  public String getBaseAddress() {
    return baseAddress;
  }
  public void setBaseAddress(String baseAddress) {
    this.baseAddress = baseAddress;
  }
  public String getDetailAddress() {
    return detailAddress;
  }
  public void setDetailAddress(String detailAddress) {
    this.detailAddress = detailAddress;
  }
  public String getPhoto() {
    return photo;
  }
  public void setPhoto(String photo) {
    this.photo = photo;
  }
  
  
}











