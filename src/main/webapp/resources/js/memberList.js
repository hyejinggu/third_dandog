"use strict";

function getMemberList() {
	let url = "/member/memberList";


	axios.get(url)
		.then(response => {
			document.getElementById("resultArea1").innerHTML = response.data;
		}).catch(err => {
			alert("response 실패: " + err.message);
		});
	document.getElementById("resultArea2").innerHTML = "";
};

function deleteMember(user_id) {
	let url = `/member/delete?user_id=${user_id}`;

	axios.get(url)
		.then(response => {
			getMemberList(); // Fixed function name
		}).catch(err => {
			alert("response 실패: " + err.message);
		});

	document.getElementById("resultArea2").innerHTML = "";
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');  // 추가된 부분

    // 폼 엘리먼트 찾기
    var form = document.getElementById('searchForm');

    console.log(form);  // 추가된 부분

    if (form) {
        // 검색 버튼 클릭 시 searchMembers 함수 호출
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // 폼의 기본 동작 막기
            searchMembers();
        });
    }
});
function searchMembers() {
    // 폼 데이터 가져오기
    let formData = new FormData(document.getElementById('searchForm'));

    // AJAX를 이용해 서버로 데이터 전송 (POST 메서드 사용)
    axios.post('/member/memberList', formData)
    .then(function(response) {
        // 서버로부터의 응답을 받아와서 resultArea2에 출력
        document.getElementById('resultArea1').innerHTML = response.data;
    })
    .catch(function(error) {
        console.error('에러 발생: ', error);
    });
}