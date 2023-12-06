"use strict"


//====================== Neighbor ===========================
function getNeighborList() {
	let url = "/community/neighborList";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";
}





function select_neighbor(select_neighbor) {
	const checkboxes
		= document.querySelectorAll('.neighbor_check');

	checkboxes.forEach((checkbox) => {
		checkbox.checked = select_neighbor.checked
	})
}


function deleteNeighbor() {

	let url = "/item/deleteItem";
	let valueArr = [];

	const checkboxes = document.querySelectorAll('.neighbor_check:checked');

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
			getItemList();
		})
		.catch((error) => {
			console.error("삭제 요청이 실패했습니다.", error);
		});

	document.getElementById("resultArea1").innerHTML = "";

}

