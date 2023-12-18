"use strict";

function getAdminOrder(pageNumber) {
  pageNumber = pageNumber || 0;

  let url = `/admin/orders?page=${pageNumber}`;

  axios
    .get(url)
    .then((response) => {
      document.getElementById("resultArea1").innerHTML = response.data;
    })
    .catch((err) => {
      alert("response 실패: " + err.message);
    });
} // getAdminOrder



function searchOrders(pageNumber) {
  pageNumber = pageNumber || 0;

  // 폼 데이터 가져오기
  let searchDelivery = document.getElementById("i_search_delivery").value;
  let searchField = document.getElementById("i_search_field").value;
  let searchValue = document.getElementById("i_search_value").value;

  // URL에 쿼리 문자열 추가
  let url = `/admin/orders?page=${pageNumber}&search_delivery=${searchDelivery}&search_field=${searchField}&search_value=${searchValue}`;

  axios.get(url)
    .then(response => {
      document.getElementById("resultArea1").innerHTML = response.data;
    })
    .catch(err => {
      alert("response 실패: " + err.message);
    });
}