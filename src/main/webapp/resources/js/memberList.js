// memberList.js
"use strict";

// getMemberList 함수를 window 객체에 등록
window.getMemberList = function () {
    let url = "/member/memberList";

    // axios를 직접 CDN에서 로드
    // axios를 사용하려면 window.axios 또는 axios로 접근
    window.axios.get(url)
        .then(response => {
            document.getElementById("resultArea1").innerHTML = response.data;

            // 비동기적으로 실행되어야 하는 코드 추가
            document.getElementById("resultArea2").innerHTML = "";
        })
        .catch(err => {
            alert("response 실패: " + err.message);
        });
};