<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Item List</title>
    <link rel="stylesheet" type="text/css" href="/resources/css/itemAdmin.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/commonAdmin.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="/resources/js/item.js"></script>
    <script>
/*     window.onload = function () {
        searchItemList();
    }; */
    </script>
</head>
<body>
<div class="title">
    <h2>상품 관리</h2>
	<h3>Item List</h3>
</div>
<c:if test="${not empty requestScope.message}">
    <h3>${requestScope.message}</h3>
</c:if>
<div class="search_wrap">
	<form id="searchForm">
	    <select id="i_search_category">
	        <option value="all">전체</option>
	        <c:forEach var="category" items="${fn:split('Snack,Toy,Living,Stroll', ',')}">
	            <option value="${category}" ${param.search_category == category ? "selected" : ""}>${category}</option>
	        </c:forEach>
	    </select>
	    <select id="i_search_field">
	        <option value="name" ${param.search_field == 'name' ? 'selected' : ''}>상품 이름</option>
	        <option value="no" ${param.search_field == 'no' ? 'selected' : ''}>상품 번호</option>
	    </select>
	    <input placeholder="검색어 입력" id="i_search_value" value="${param.search_value}"/>
	    <input type="button" onclick="searchItemList()" value="적용"/>
	    <input type="reset" value="취소" onclick="getItemList()"/>
	</form>
</div>
<table class="table item_list">
    <tr>
        <!-- 페이징 처리 추가 -->
        <th>
    		<label for="selectall">전체</label><br>
			<input type="checkbox" id="selectall" value='selectall' onclick='select_item(this)'/>
		</th>
        <th>번호</th>
        <th>카테고리</th>
        <th class="item_name_col">이름</th>
        <th>가격</th>
        <th>사이즈</th>
        <th>컬러</th>
        <th>판매 수량</th>
        <th>할인율</th>
        <th>등록일</th>
        <th>대표사진1</th>
        <th>대표사진2</th>
    </tr>
    <c:if test="${not empty requestScope.itemList}">
        <c:forEach var="i" items="${requestScope.itemList}">
            <tr>
                <td><input type="checkbox" name="selectedItem" class="item_check" value="${i.item_no}"/></td>
                <td>${i.item_no}</td>
                <td>${i.item_category}</td>
                <td onclick="getItemDetail(${i.item_no})">${i.item_name}</td>
                <td>${i.item_price}원</td>
                <td>${i.options_size}</td>
                <td>${i.options_color}</td>
                <td>${i.item_sales_volume}</td>
                <td>${i.item_discount_rate}%</td>
                <td>${i.regdate.year}-${i.regdate.monthValue}-${i.regdate.dayOfMonth}</td>
                <td><img alt="itemImage1" src="/${i.item_img1}" width="50" height="70"></td>
                <td><img alt="itemImage2" src="/${i.item_img2}" width="50" height="70"></td>
            </tr>
        </c:forEach>
    </c:if>
    <tr>
		<!-- 페이징 버튼 추가 -->
    	<td colspan="13">
    		<div class="pagination_wrap" >
			<c:if test="${not empty requestScope.itemPage}">
			    <c:forEach var="pageNumber" begin="0" end="${requestScope.itemPage.totalPages - 1}">
			        <span onclick="searchItemList(${pageNumber})"
			              class="${pageNumber == requestScope.itemPage.number ? 'currentPage' : ''}">
			            ${pageNumber + 1}
			        </span>
			    </c:forEach>
			</c:if>
			</div>
    	</td>
    </tr>
    <c:if test="${empty requestScope.itemList}">
        <tr>
            <td colspan="13">출력할 데이터가 없습니다.</td>
        </tr>
    </c:if>
</table>

<input type="submit" value="선택 삭제" onclick="deleteItem()"/>

<h4>
    <a href="/home">Home으로 가기</a>
</h4>
</body>
</html>
