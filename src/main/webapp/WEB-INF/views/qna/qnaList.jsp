<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Qna_List **</title>
<!-- <link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css"> -->
</head>
<body>
<h2>** Qna_List **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table style="width:100%">
	<tr bgcolor="DeepPink">
		<th>qna_seq</th><th>qna_title</th><th>user_id</th><th>Regdate</th><th>qna_view</th>
	</tr>
	<c:if test="${not empty requestScope.qnai}">
		<c:forEach var="q" items="${requestScope.qnai}">
		<tr><td>${q.qna_seq}</td>
			<!-- Title
				=> 로그인 한 경우에만 글내용을 볼 수 있도록  Link 추가  
				=> 댓글 작성후에는 indent 값에 따른 들여쓰기 기능-->
			<td>
				<c:if test="${q.indent>0}">
					<c:forEach begin="1" end="${q.indent}">
						<span>&nbsp;&nbsp;</span>
					</c:forEach>
					<span style="color:blue;">re..</span>
				</c:if>
				
				<c:if test="${not empty sessionScope.loginID}">
					<a href="qdetail?qna_seq=${q.qna_seq}">${q.qna_title}</a>
			 	</c:if>    
				<c:if test="${empty sessionScope.loginID}">
					${q.qna_title}
			 	</c:if>
			</td>
			<td>${q.user_id}</td><td>${q.regdate}</td><td>${q.qna_view}</td>
		</tr>	
		</c:forEach>
	</c:if>
	<c:if test="${empty requestScope.qnai}">
		<tr><td colspan="5">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<hr>
<!-- 로그인 한 경우에만 새글등록 가능 -->
<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="qnaInsert">새글등록</a>&nbsp;
</c:if>	
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>