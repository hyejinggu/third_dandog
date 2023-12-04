"use strict"


function getcodeList() {
	let url = "/code/codeList";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";

}


function codeInsert() {
	let url = "/code/codeInsert";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";

}


function addCodeName() {
	// 활성화/비활성화를 토글하기 위해 select와 input의 상태를 확인
	let select = document.getElementById('codeNameSelect');
	let input = document.getElementById('newCodeNameInput');
	let span = document.getElementById('add');

	if (input.style.display === 'none') {
		// input을 활성화하고 select를 비활성화
		input.style.display = 'inline';
		select.disabled = true;
		span.innerText = "기존 코드 분류 사용"
	} else {
		// input을 비활성화하고 select를 활성화
		input.style.display = 'none';
		select.disabled = false;
		span.innerText = "새로운 코드 분류 추가"
	}
}



function codeInsertToDB() {
	let formData = new FormData(document.getElementById("code_insert_form"));
	let url = "/code/insert";
	axios.post(url, formData
	).then(response => {
		getcodeList();
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";
}




function deleteCode(code_seq) {
	let url = `/code/delete?code_seq=${code_seq}`;

	axios.get(url
	).then(response => {
		getcodeList();
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";

}





