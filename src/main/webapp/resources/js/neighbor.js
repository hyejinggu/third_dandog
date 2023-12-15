"use strict";

function showAllContents(event) {
  // Toggle the visibility of short and full texts
  let expandableRow = event.target.closest(".expandable_row");
  expandableRow.classList.toggle("expanded");
}

//====================== Neighbor ===========================
function getNeighborList(pageNumber) {
	pageNumber = pageNumber || 0;
  let url = `/community/neighborList?page=${pageNumber}`;

  axios
    .get(url)
    .then((response) => {
      document.getElementById("resultArea1").innerHTML = response.data;
    })
    .catch((err) => {
      alert("response 실패: " + err.message);
    });

  document.getElementById("resultArea2").innerHTML = "";
}

function searchNeighborList(pageNumber) {
	pageNumber = pageNumber || 0;
  let url = "/community/neighborList";

  let searchCategory = document.getElementById("n_search_category").value;
  let searchField = document.getElementById("n_search_field").value;
  let searchValue = document.getElementById("n_search_value").value;

  url += `?page=${pageNumber}&search_category=${searchCategory}&search_field=${searchField}&search_value=${searchValue}`;

  axios
    .get(url)
    .then((response) => {
      document.getElementById("resultArea1").innerHTML = response.data;
    })
    .catch((err) => {
      alert("response 실패: " + err.message);
    });
}

// =========================================================================

function select_neighbor(select_neighbor) {
  const checkboxes = document.querySelectorAll(".neighbor_check");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = select_neighbor.checked;
  });
}

function deleteNeighbor() {
  let url = "/community/deleteNeighbor";
  let valueArr = [];

  const checkboxes = document.querySelectorAll(".neighbor_check:checked");

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
  axios
    .post(url, { valueArr: valueArr })
    .then((response) => {
      console.log("삭제 요청이 성공했습니다.", response);
      getNeighborList();
    })
    .catch((error) => {
      console.error("삭제 요청이 실패했습니다.", error);
    });

  document.getElementById("resultArea1").innerHTML = "";
}
