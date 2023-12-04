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


//====================== Event ===========================


function getEventList() {

	let url = "/community/eventList";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";
}


function eventInsert() {
	let url = "/community/eventInsert";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";
}



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