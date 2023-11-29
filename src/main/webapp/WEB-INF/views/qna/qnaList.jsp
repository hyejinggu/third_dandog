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
				
			<td><c:if test="${not empty sessionScope.loginID}">
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
<!-- 로그인 한 경우에만 새글등록 가능
<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="qnaInsert">새글등록</a>&nbsp;
</c:if>	 -->
&nbsp;<a href="/home">Home</a>&nbsp;
&nbsp;<a href="qna/qnaInsert">Qna등록</a>&nbsp; <!-- 테스트 후 삭제, 리액트에서 고객센터 정보받아와야함 -->
&nbsp;<a href="qna/replyInsert">Reply등록</a>&nbsp;
<!-- &nbsp;<span class="textlink" onclick="qna/replyInsert()">replyInsert</span>&nbsp; -->
</body>
</html>