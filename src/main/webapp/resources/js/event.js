"use strict"


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

//==========================================================================


function toggleSearchOptions() {
    var searchCategory = document.getElementById("e_search_category");
    var searchName = document.getElementById("e_search_name");
    var searchDate = document.getElementById("e_search_date");

    if (searchCategory.value === "name") {
        searchName.style.display = "inline-block";
        searchDate.style.display = "none";
    } else if (searchCategory.value === "date") {
        searchName.style.display = "none";
        searchDate.style.display = "inline-block";
    }
}

// Initialize on page load
toggleSearchOptions();




function searchEventList() {
	let url = "/community/eventList";
	
	let searchCategory = document.getElementById("e_search_category").value;
	let searchValue = document.getElementById("e_search_value").value;
	let regDate = document.getElementById("e_reg_date").value;
	let expDate = document.getElementById("e_exp_date").value;

	//alert("searchCategory: " + searchCategory + "searchValue: " + searchValue);
	//alert("regDate: " + regDate + "expDate: " + expDate);

	url += `?search_category=${searchCategory}&search_value=${searchValue}&reg_date=${regDate}&exp_date=${expDate}`;

	axios.get(url)
		.then(response => {
			document.getElementById("resultArea1").innerHTML = response.data;
		})
		.catch(err => {
			alert("response 실패: " + err.message);
		});
}




//==========================================================================

function select_event(select_event) {
	const checkboxes
		= document.querySelectorAll('.event_check');

	checkboxes.forEach((checkbox) => {
		checkbox.checked = select_event.checked
	})
}


function deleteEvent() {

	let url = "/item/deleteItem";
	let valueArr = [];

	const checkboxes = document.querySelectorAll('.event_check:checked');

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

