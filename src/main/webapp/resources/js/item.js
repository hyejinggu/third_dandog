"use strict"


function getAdminItem() {
	let url = "/item/itemList";
	
	axios.get(url
	).then(response => {
		document.getElementById("resultArea1").innerHTML = response.data;
	}).catch(err => {
		alert("response 실패: " + err.message)
	});
	
	document.getElementById("resultArea2").innerHTML="";

} // getAdminItem


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



// ========================================================================



function selectAll(selectAll)  {
  const checkboxes 
     = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAll.checked
  })
}



