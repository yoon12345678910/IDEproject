package java63.web03.dao;

import java.util.Map;
import java63.web03.domain.User;

public interface UserDao {
  User existUser(Map<String,String> params);
  /*void insert(USER member);
*/}
