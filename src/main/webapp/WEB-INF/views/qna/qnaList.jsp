<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Qna_List **</title>
<!-- <link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css"> -->
<script src="/resources/js/board.js"></script>
</head>
<body>
<h2>** Qna_List **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>

<table style="width:100%">
	<tr bgcolor="Orange">
		<th></th><th>qna_seq</th><th>qna_category</th><th>qna_title</th><th>user_id</th><th>Regdate</th><th>qna_view</th><th>answer_state</th>
	</tr>
	<c:if test="${not empty requestScope.qnai}">
		<c:forEach var="q" items="${requestScope.qnai}">
		<tr>
			<td><input type="checkbox" name="selectedItem1" class="qna_check"
			value="${q.qna_seq}" /></td>
			<td>${q.qna_seq}</td>
			<th>${q.qna_category}</th>
			<td> <a href="/qna/qdetail?qna_seq=${q.qna_seq}">${q.qna_title}</a></td>
			<td>${q.user_id}</td><td>${q.regdate}</td><td>${q.qna_view}</td><td>${q.answer_state}</td>
		</tr>	
		</c:forEach>
	</c:if>
	<c:if test="${empty requestScope.qnai}">
		<tr><td colspan="5">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<hr>
<div>
	<input type="checkbox" id="selectall" value='selectall'
		onclick='select_qna(this)' /> <label for="selectall">전체선택</label>
</div>
<!-- 삭제 -->
<input type="submit" value="qdelete" onclick="qdelete()"/> 
<%-- <td class="textlink" onclick="qdelete('${q.qna_seq}')">삭제</td> --%>


<!-- 로그인 한 경우에만 새글등록 가능
<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="qnaInsert">새글등록</a>&nbsp;
</c:if>	 -->
<br>
&nbsp;<a href="/home">Home</a>&nbsp;
<!-- &nbsp;<a href="qna/qnaInsert">Qna등록테스트</a>&nbsp;  --><!-- 테스트 후 삭제, 리액트에서 고객센터 정보받아와야함 -->
<!-- &nbsp;<a href="qna/replyInsert">Reply등록</a>&nbsp; -->
<!-- &nbsp;<span class="textlink" onclick="qna/replyInsert()">replyInsert</span>&nbsp; -->

</body>
</html>