"use strict"


function getItemList() {
	let url = "/item/itemList";
	
	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});
	
	document.getElementById("resultArea2").innerHTML="";

} // getItemInsert


function getItemInsert() {
	let url = "/item/itemInsert";
	
	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});
	
	document.getElementById("resultArea2").innerHTML="";

} // getItemInsert



function getItemDetail(item_no) {
	let url = "/item/itemdetail?item_no=" + item_no;
	
	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});
	
	document.getElementById("resultArea2").innerHTML="";

}


function searchList() {
    let url = "/item/itemList";

    // 폼 데이터 가져오기
    let searchCategory = document.querySelector('[name="search_category"]').value;
    let searchField = document.querySelector('[name="search_feild"]').value;
    let searchValue = document.querySelector('[name="search_value"]').value;
	

    // URL에 쿼리 문자열 추가
    url += `?search_category=${searchCategory}&search_field=${searchField}&search_value=${searchValue}`;

    axios.get(url)
        .then(response => {
            document.getElementById("resultArea1").innerHTML = response.data;
        })
        .catch(err => {
            alert("response 실패: " + err.message);
        });

	
    document.getElementById("resultArea1").innerHTML = "";
}


// ========================================================================



function selectAll(selectAll)  {
  const checkboxes 
     = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked
  })
}



