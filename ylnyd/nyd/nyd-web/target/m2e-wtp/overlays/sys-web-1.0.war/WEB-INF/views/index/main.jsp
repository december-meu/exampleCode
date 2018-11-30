<%@page import="org.apache.shiro.subject.Subject"%>
<%@page import="com.dadi.sys.entity.User"%>
<%@page import="org.apache.shiro.SecurityUtils"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>

<head>
<%@include file="/WEB-INF/views/include/header.jsp"%>
<style type="text/css">
html {
	margin: 0;
	padding: 0;
}

#wrappe, body.full-height-layout #page-wrapper {
	overflow-y: hidden;
}
</style>
</head>

<%
	Subject subject = SecurityUtils.getSubject();
	if (subject.isRunAs()) {
		User previousUser = (User) subject.getPreviousPrincipals().getPrimaryPrincipal();

		if (previousUser != null)
			System.out.println("before========main========" + previousUser.getAccount());

	}
%>


<body class="gray-bg">
	<div class="row">
		<div class="col-sm-12">
			<div class="wrapper wrapper-content animated fadeInUp">
				<ul class="notes">
					<li>
						<div>
							<small>（一）</small>
							<h4>字典编码</h4>
							<p>字典类型 "type"-"关键字",例如学历类型 :type-edu,字典值编码 "关键字"-描述词,例如 学历具体分类:edu-bachelor(本科),edu-master(硕士 ),edu-doctor(博士)</p>
							<a href="pin_board.html#"><i class="fa fa-trash-o "></i></a>
						</div>
					</li>
					<li>
						<div>
							<small>（二）</small>
							<h4>机构部门编码</h4>
							<p>机构部门编码规则1，全部大写，2，部门编码时系统自动添加所属机构编码作为前缀，如西安大地测绘 机构编码：DDCH ,研发中心 部门编码则为 DDCH-YFZX</p>
							<a href="pin_board.html#"><i class="fa fa-trash-o "></i></a>
						</div>
					</li>
					<li>
						<div>
							<small>（三）</small>
							<h4>表单验证</h4>
							<p>所有表单，需在前端做完整的验证，表单验证选用BootstrapValidator插件来实现,所有不能重复字段需进行remot验证,具体参考BootstrapValidator Api,</p>
							<a href="pin_board.html#"><i class="fa fa-trash-o "></i></a>
						</div>
					</li>
					<li>
						<div>
							<small>（四）</small>
							<h4>资源标识</h4>
							<p>自愿标识，按照以下规则编写, 模块资源：'关键字:model',例如 财务模块 ：fin:model,菜单资源（有连接)，例如日记账管理 ：fin:journal:view,操作资源（按钮）,添加 ：fin:journal:add,编辑：fin:journal:edit,删除 fin:journal:delete</p>

							<a href="pin_board.html#"><i class="fa fa-trash-o "></i></a>
						</div>
					</li>
					<li>
						<div>
							<small>（五）</small>
							<h4>关键字</h4>
							<p>关键字,需配置管理人员统一管理,并分类，如 模块关键则 ：sys(系统),fin（财务）,user,prj,crm..., 操作关键字, add,edit,delete...,持续收录，统一管理</p>
							<a href="pin_board.html#"><i class="fa fa-trash-o "></i></a>
						</div>
					</li>
					<li>
						<div>
							<small>（六）</small>
							<h4>Maven 常用命令...</h4>
							<p>1，清理 mvn clean ,2打包并安装到本地 install ,3跳过测试:-Dmaven.test.skip(=true)</p>
							<a href="pin_board.html#"><i class="fa fa-trash-o "></i></a>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>


</body>



</html>
