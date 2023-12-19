<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Qna_Insert **</title>

</head>
<body>
<h2>** Qna_Insert **</h2>

<form action="qinsert" method="Post" enctype="multipart/form-data">
<table>
	<tr height="40"><th bgcolor="Violet">User_I D</th>
		<td><input type="text" name="user_id" value="${sessionScope.loginID}" readonly size="20"></td></tr> <!-- 로그인기능 만들면 read only 추가해야함 -->
	 <tr height="40">
        <th bgcolor="Violet">Qna_Category</th>
        <td>
            <select name="qna_Category">
                <option value="주문/결제">주문/결제</option>
                <option value="배송">배송</option>
                <option value="취소/반품">취소/반품</option>
                <option value="교환/AS">교환/AS</option>
                <option value="회원">회원</option>
                <option value="적립금/이벤트">적립금/이벤트</option>
                <option value="기타">기타</option>
            </select>
        </td>
     </tr>
	<tr height="40"><th bgcolor="Violet">Title</th>
		<td><input type="text" name="qna_title" size="50"></td></tr>	
	<tr height="60"><th bgcolor="Violet">Content</th>
		<td><textarea rows="10" cols="1500" name="qna_content"></textarea></td></tr>
	<!-- <tr height="60">
		<th bgcolor="Violet">Image</th>
		<td>
			<input type="file" name="qna_image" accept=image/*">
		</td>
	</tr> -->
	
	<tr height="40"><th></th>
		<td><input type="submit" value="등록">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소">		
		</td>
	</tr>					
</table>
</form>
<hr> <!-- 이미지 미리보기 -->
<%-- <c:if test="${not empty requestScope.qna_image}">
        <img src="${requestScope.qna_image}" alt="Uploaded Image" width="200">
</c:if> --%>
<hr>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}
</c:if>
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
<!-- &nbsp;<a href="/home">Home</a>&nbsp; -->
</body>
</html>