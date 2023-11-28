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