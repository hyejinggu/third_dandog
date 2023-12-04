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