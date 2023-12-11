"use strict"


function getAdminBoard() {
	let url = "/qna/qnaList";
	
	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});
	
	document.getElementById("resultArea2").innerHTML="";

} // getAdminQna

//===========================================================


//============================================================
// qna 체크박스 삭제
function select_qna(select_qna) {
	const checkboxes
		= document.querySelectorAll('.qna_check');

	checkboxes.forEach((checkbox) => {
		checkbox.checked = select_qna.checked
	})
}

function qdelete() {

	let url = "/qna/qdelete";
	let valueArr = [];

	const checkboxes = document.querySelectorAll('.qna_check:checked');

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
			alert("삭제 요청이 성공했습니다.", response);
			console.log("삭제 요청이 성공했습니다.", response);
			//getqnaList();
			document.getElementById("resultArea1").innerHTML = response.data;
		})
		.catch((error) => {
			console.error("삭제 요청이 실패했습니다.", error);
		});

	document.getElementById("resultArea1").innerHTML = "";

}
