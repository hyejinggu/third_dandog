"use strict"


function getAdminCommunity() {
	let url = "/community/loungelist";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";

} // getAdminCommunity


//====================== lounge ===========================

function getLoungeList() {
	let url = "/community/loungeList";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";
}


function loungeInsert() {
	let url = "/community/loungeInsert";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";
}




function searchLoungeList() {
	let url = "/community/loungeList";
	
	let searchCategory = document.getElementById("l_search_category").value;
	let searchField = document.getElementById("l_search_field").value;
	let searchValue = document.getElementById("l_search_value").value;
	
	url += `?search_category=${searchCategory}&search_field=${searchField}&search_value=${searchValue}`;

	axios.get(url)
		.then(response => {
			document.getElementById("resultArea1").innerHTML = response.data;
		})
		.catch(err => {
			alert("response 실패: " + err.message);
		});
}



// =================================================================================


function select_lounge(select_lounge) {
	const checkboxes
		= document.querySelectorAll('.lounge_check');

	checkboxes.forEach((checkbox) => {
		checkbox.checked = select_lounge.checked
	})
}


function deleteLounge() {

	let url = "/community/deleteLounge";
	let valueArr = [];

	const checkboxes = document.querySelectorAll('.lounge_check:checked');

	// 선택된 체크박스의 값을 배열에 추가
	checkboxes.forEach((checkbox) => {
		valueArr.push(checkbox.value);
	});

	// 선택된 아이템이 없을 경우 알림 또는 처리 로직 추가
	if (valueArr.length === 0) {
		alert("선택된 아이템이 없습니다.");
		return;
	}

	// 아래는 AJAX를 사용한 서버 요청 예시
	axios.post(url, { "valueArr": valueArr })
		.then((response) => {
			console.log("삭제 요청이 성공했습니다.", response);
			getLoungeList();
		})
		.catch((error) => {
			console.error("삭제 요청이 실패했습니다.", error);
		});


}

