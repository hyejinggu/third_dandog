<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ taglib uri="http://java.sun.com/jsp/jstl/core"
prefix="c"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Lounge</title>
    <link
      rel="stylesheet"
      type="text/css"
      href="/resources/css/neighborAdmin.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="/resources/css/commonAdmin.css"
    />
    <script src="/resources/js/neighbor.js"></script>
  </head>
  <body>
    <div class="title">
      <h2>커뮤니티 관리</h2>
      <h3>Neighborhood Review</h3>
    </div>

    <div class="search_wrap">
      <select name="search_category" id="n_search_category">
        <option value="all">전체</option>
        <option value="beauty">미용</option>
        <option value="hospital">병원</option>
        <option value="cafe">카페, 호텔</option>
        <option value="training">훈련, 시터</option>
      </select>
      <select name="search_feild" id="n_search_field">
        <option value="contents">제목+내용</option>
        <option value="brand">상호명</option>
        <option value="id">작성자</option>
      </select>
      <input
        name="search_value"
        placeholder="검색어 입력"
        id="n_search_value"
      />
      <button onclick="searchNeighborList()">검색</button>
    </div>
    <table class="table neighbor_list">
      <tr>
        <th>
          <label for="selectall">전체</label>
          <input
            type="checkbox"
            id="selectall"
            value="selectall"
            onclick="select_neighbor(this)"
          />
        </th>
        <th>번호</th>
        <th>상호명</th>
        <th>제목 및 내용</th>
        <th>별점</th>
        <th>작성자</th>
        <th>카테고리</th>
        <th>날짜</th>
      </tr>
      <c:forEach var="n" items="${requestScope.neighborList}">
        <tr>
          <td>
            <input
              type="checkbox"
              name="selectedItem"
              class="neighbor_check"
              value="${n.neighbor_no}"
            />
          </td>
          <td>${n.neighbor_no}</td>
          <td>${n.neighbor_brand_name}</td>
          <td class="expandable_row" onclick="showAllContents(event)">
            <p>${n.neighbor_title}</p>
            <p class="full_text">${n.neighbor_content}</p>
          </td>
          <td>${n.neighbor_rating}</td>
          <td>${n.user_id}</td>
          <td>${n.neighbor_category}</td>
          <td>${n.regdate}</td>
        </tr>
      </c:forEach>
       <tr>
		<!-- 페이징 버튼 추가 -->
    	<td colspan="13">
    		<div class="pagination_wrap" >
			<c:if test="${not empty requestScope.neighborPage}">
			    <c:forEach var="pageNumber" begin="0" end="${requestScope.neighborPage.totalPages - 1}">
			        <span onclick="searchNeighborList(`${pageNumber}`)"
			              class="${pageNumber == requestScope.neighborPage.number ? 'currentPage' : ''}">
			            ${pageNumber + 1}
			        </span>
			    </c:forEach>
			</c:if>
			</div>
    	</td>
    </tr>
    </table>
    <div class="neighbor_btn">
      <input type="submit" value="게시글 삭제" onclick="deleteNeighbor()" />
    </div>
  </body>
</html>
