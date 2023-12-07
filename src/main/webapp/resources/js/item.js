"use strict"


function getItemList() {
	let url = "/item/itemList";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";

} // getItemInsert


function getItemInsert() {
	let url = "/item/itemInsert";

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";

} // getItemInsert



function getItemDetail(item_no) {
	let url = "/item/itemdetail?item_no=" + item_no;

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";

}



function itemUpdate(item_no) {
	let url = "/item/itemupdate?item_no=" + item_no;

	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});

	document.getElementById("resultArea2").innerHTML = "";
}



function updateItem() {
    let url = "/item/update";
    let formData = new FormData();

    // 선택된 이미지의 체크박스를 찾아서 FormData에 추가
    let selectedImages = document.getElementsByName("selectedImages");
    for (let i = 0; i < selectedImages.length; i++) {
        if (selectedImages[i].checked) {
            // 이미지 번호를 FormData에 추가
            formData.append("selectedImages", selectedImages[i].value);
        }
    }

    // 수정된 이미지 업로드를 위한 파일 입력 추가
    let etcImages = document.getElementById("etcImages").files;
    for (let i = 0; i < etcImages.length; i++) {
        formData.append("etcImages", etcImages[i]);
    }

    axios.post(url, formData)
        .then((response) => {
            console.log("업데이트 요청이 성공했습니다.", response);
            getEventList();
        })
        .catch((error) => {
            console.error("업데이트 요청이 실패했습니다.", error);
        });
}





function searchItemList() {
	let url = "/item/itemList";

	// 폼 데이터 가져오기
	let searchCategory = document.getElementById("i_search_category").value;
	let searchField = document.getElementById("i_search_field").value;
	let searchValue = document.getElementById("i_search_value").value;


	// URL에 쿼리 문자열 추가
	url += `?search_category=${searchCategory}&search_field=${searchField}&search_value=${searchValue}`;

	axios.get(url)
		.then(response => {
			document.getElementById("resultArea1").innerHTML = response.data;
		})
		.catch(err => {
			alert("response 실패: " + err.message);
		});
}


// ========================================================================



function select_item(select_item) {
	const checkboxes
		= document.querySelectorAll('.item_check');

	checkboxes.forEach((checkbox) => {
		checkbox.checked = select_item.checked
	})
}


function deleteItem() {

	let url = "/item/deleteItem";
	let valueArr = [];

	const checkboxes = document.querySelectorAll('.item_check:checked');

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



