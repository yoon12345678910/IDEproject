package java63.web03.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

public class CrossDomainFilter implements Filter {
  FilterConfig filterConfig;
  
  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    this.filterConfig = filterConfig;
  }

  @Override
  public void doFilter(ServletRequest request, ServletResponse response,
      FilterChain nextFilter) throws IOException, ServletException {
	  
	((HttpServletResponse)response).setHeader("Access-Control-Allow-Origin", "*");  
	  System.out.println("dddd");
    nextFilter.doFilter(request, response);
    
  }

  @Override
  public void destroy() {}

}








