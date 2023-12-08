<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Qna Detail **</title>

</head>
<body>
<h2>** Qna Detail & Reply 등록 **</h2>
<form action="replyinsert" method="Post">
<table>
<c:if test="${not empty requestScope.qnai}">
	<tr height="40"><th bgcolor="Plum">SEQ</th>
		<td> <input type="text" name="qna_seq" readonly="readonly"
			value="${requestScope.qnai.qna_seq}">
		</td></tr>
	<tr height="40"><th bgcolor="Plum">I D</th>
		<td>${requestScope.qnai.user_id}</td></tr>	
	
	<tr height="40"><th bgcolor="Plum">CATEGORY</th>
		<td>${requestScope.qnai.qna_category}</td></tr>	
		
	<tr height="40"><th bgcolor="Plum">Title</th>
		<td>${requestScope.qnai.qna_title}</td></tr>
	<tr height="40"><th bgcolor="Plum">Content</th>
		<td>${requestScope.qnai.qna_content}</td></tr>
		
	<tr height="40"><th bgcolor="Plum">RegDate</th>
		<td>${requestScope.qnai.regdate}</td></tr>
	<tr height="40"><th bgcolor="Plum">조회수</th>
		<td>${requestScope.qnai.qna_view}</td></tr>
	
	<tr height="40"><th bgcolor="lime">REPLY</th>
		<td><textarea rows="5" cols="50" name="qna_reply">
		${requestScope.qnai.qna_reply}
		</textarea>
		</td></tr>	
		
	<tr height="40"><th></th>
		<td><input type="submit" value="답변등록">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="답변취소">		
		</td>
	</tr>	
	
</c:if>
<c:if test="${empty requestScope.qnai}">
	<tr><td colspan="2">~~ 출력할 자료가 없습니다 ~~</td></tr>
</c:if>
</table>
</form>
<hr>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}
</c:if>
<hr>
	<td class="textlink" onclick="qdelete('${q.qna_seq}')">삭제</td>
	<%-- <a href="qdelete?seq=${requestScope.qnai.qna_seq}&root=${qnai.root}">글삭제</a> --%>
	
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>