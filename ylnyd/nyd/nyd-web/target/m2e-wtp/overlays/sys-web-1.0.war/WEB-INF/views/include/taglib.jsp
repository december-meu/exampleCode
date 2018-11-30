<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sys" tagdir="/WEB-INF/tags/sys" %>
<%@ taglib prefix="fns" uri="/WEB-INF/tlds/sys/sys.tld" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="dshiro" uri="/ddch/shiro/security"%>
<%  
  String basePath = request.getContextPath();  
  String rootPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort();
  String path = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath+"/";
  String domainPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+"/";
%> 
<c:set var="webPath" value="<%=path%>"/>
<c:set var="domainPath" value="<%=domainPath%>"/>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/static" />
<c:set var="_orgId" value="${not empty sessionScope.default_org?sessionScope.default_org.id:''}" />
<c:set var="_orgName" value="${not empty sessionScope.default_org?sessionScope.default_org.name:''}" />
<c:set var="_user" value="${not empty sessionScope.current_user?sessionScope.current_user.username:''}" />
<c:set var="_userId" value="${not empty sessionScope.current_user?sessionScope.current_user.id:''}" />
<c:set var="_roles" value="${fns:getUserRoles(not empty sessionScope.current_user?sessionScope.current_user.id:'')}" />
<c:set var="_permissions" value="${fns:getUserPermissions(not empty sessionScope.current_user?sessionScope.current_user.id:'')}" />
<script type="text/javascript">
var webPath="<%=path%>";
var domainPath="<%=domainPath%>";
var _orgId="${_orgId}";
var _orgName="${_orgName}";
var _userId="${_userId}";
var _userName="${_user}";
var _roles="${_roles}";
var _permissions="${fn:trim(_permissions)}";

// console.log(_userId+"||"+_roles+"||"+_permissions);
</script>