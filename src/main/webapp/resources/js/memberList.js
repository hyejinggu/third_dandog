"use strict";

function getMemberList() {
    let url = "/member/memberList";

    axios.get(url)
        .then(response => {
            document.getElementById("resultArea1").innerHTML = response.data;
        })
        .catch(err => {
            alert("response 실패: " + err.message);
        });

    document.getElementById("resultArea2").innerHTML = "";
}

function deleteMember(user_id) {
    let url = `/member/delete?user_id=${user_id}`;

    axios.delete(url) // Use HTTP DELETE method
        .then(response => {
            getMemberList();
        })
        .catch(err => {
            alert("response 실패: " + err.message);
        });

    document.getElementById("resultArea2").innerHTML = "";
}


// function searchMembers() {
//     // 폼 데이터 가져오기
//     let formData = new FormData(document.getElementById('searchForm'));

//     document.getElementById("resultArea2").innerHTML = "";
//     // AJAX를 이용해 서버로 데이터 전송 (POST 메서드 사용)
//     axios.post('/member/memberList', formData)
//         .then(function (response) {
//             // 서버로부터의 응답을 받아와서 resultArea2에 출력
//             document.getElementById('resultArea1').innerHTML = response.data;
//         })
//         .catch(function (error) {
//             console.error('에러 발생: ', error);
//         });
// }

function searchMembers() {
    let url = "/member/memberSearch";

    // 폼 데이터 가져오기
    let searchField = document.getElementById("m_search_field").value;
    let searchValue = document.getElementById("m_search_value").value;


    // URL에 쿼리 문자열 추가
    url += `?search_field=${searchField}&search_value=${searchValue}`;

    axios.get(url)
        .then(response => {
            document.getElementById("resultArea1").innerHTML = response.data;
        })
        .catch(err => {
            alert("response 실패: " + err.message);
        });
}