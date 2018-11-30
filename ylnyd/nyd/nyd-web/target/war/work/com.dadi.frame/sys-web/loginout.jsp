<%@page import="com.dadi.auth.ShiroKit"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.dadi.common.AppInit"%>
<%
	ShiroKit.clearAuthenticCache();
	ShiroKit.clearAuthrizeCache();
    session.invalidate();
    response.sendRedirect(AppInit.getContextServer());
%>