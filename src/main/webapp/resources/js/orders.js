"use strict";

function getAdminOrder() {
  let url = "/admin/orders";

  axios
    .get(url)
    .then((response) => {
      document.getElementById("resultArea1").innerHTML = response.data;
    })
    .catch((err) => {
      alert("response 실패: " + err.message);
    });

  document.getElementById("resultArea2").innerHTML = "";
} // getAdminOrder
