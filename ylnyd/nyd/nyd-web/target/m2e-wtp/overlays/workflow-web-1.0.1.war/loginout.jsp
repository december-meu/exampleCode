<%@ page language="java" pageEncoding="UTF-8" %>
<%@page import="com.dadi.common.AppInit" %>
<%
    session.invalidate();
    response.sendRedirect(AppInit.getCasServer() + "/logout?service=" + AppInit.getSourceServer());
%>