<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="dshiro" uri="/ddch/shiro/security" %>
<%  
  String basePath = request.getContextPath();  
  String path = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath+"/";  
%> 
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ctxStatic" value="${pageContext.request.contextPath}/static" />
<script type="text/javascript">
var webPath="<%=path%>";
</script>