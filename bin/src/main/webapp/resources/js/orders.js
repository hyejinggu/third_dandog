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


function select_order(select_order) {
  const checkboxes
    = document.querySelectorAll('.order_check');

  checkboxes.forEach((checkbox) => {
    checkbox.checked = select_order.checked
  })
}


function deleteOrder() {

  let url = "/admin/deleteOrder";
  let valueArr = [];

  const checkboxes = document.querySelectorAll('.order_check:checked');

  // 선택된 체크박스의 값을 배열에 추가
  checkboxes.forEach((checkbox) => {
    valueArr.push(checkbox.value);
  });

  // 선택된 아이템이 없을 경우 알림 또는 처리 로직 추가
  if (valueArr.length === 0) {
    alert("선택된 아이템이 없습니다.");
    return;
  }

  console.log("선택된 아이템을 삭제합니다:", valueArr);

  // 아래는 AJAX를 사용한 서버 요청 예시
  axios.post(url, { "valueArr": valueArr })
    .then((response) => {
      console.log("삭제 요청이 성공했습니다.", response);
      getAdminOrder();
    })
    .catch((error) => {
      console.error("삭제 요청이 실패했습니다.", error);
    });

  document.getElementById("resultArea1").innerHTML = "";

}

function getOrderDetail(order_num) {
  let url = `/admin/orderdetail?order_num=${order_num}`;

  axios.get(url
  ).then(response => {
    document.getElementById("resultArea1").innerHTML = response.data;
  }).catch(err => {
    alert("response 실패: " + err.message)
  });

  document.getElementById("resultArea2").innerHTML = "";

}

function orderStateChange(order_num) {
  let url = `/admin/orderstatechange?order_num=${order_num}`

  axios.post(url)
    .then((response) => {
      console.log("배송상태 변경 요청이 성공했습니다.", response.data);
      getAdminOrder();
    })
    .catch((error) => {
      if (error.response.status === "502") {
        alert(error.response.data);
      } else {
        console.error("배송상태 변경 요청이 실패 => ", error.message);
      }
    });

  document.getElementById("resultArea1").innerHTML = "";
}

function payStateChange(order_num) {
  let url = `/admin/paystatechange?order_num=${order_num}`

  axios.post(url)
    .then((response) => {
      console.log("결제상태 변경 요청이 성공했습니다.", response);
      getAdminOrder();
    })
    .catch((error) => {
      if (error.response.status === "502") {
        alert(error.response.data);
      } else {
        console.error("결제상태 변경 요청이 실패 => ", error.message);
      }
    });

  document.getElementById("resultArea1").innerHTML = "";
}