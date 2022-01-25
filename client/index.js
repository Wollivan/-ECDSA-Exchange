import "./index.scss";

const server = "http://localhost:3042";

document
  .getElementById("exchange-address")
  .addEventListener("input", ({ target: { value } }) => {
    if (value === "") {
      document.getElementById("balance").innerHTML = 0;
      return;
    }

    fetch(`${server}/balance/${value}`)
      .then((response) => {
        return response.json();
      })
      .then(({ balance }) => {
        document.getElementById("balance").innerHTML = balance;
      });
  });

document.getElementById("transfer-amount").addEventListener("click", () => {
  const sender = document.getElementById("exchange-address").value;
  const privateKey = document.getElementById("private-key").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;

  const body = JSON.stringify({
    sender,
    privateKey,
    amount,
    recipient,
  });

  const request = new Request(`${server}/send`, { method: "POST", body });

  fetch(request, { headers: { "Content-Type": "application/json" } })
    .then((response) => {
      return response.json();
    })
    .then(({ balance }) => {
      document.getElementById("balance").innerHTML = balance;
    });
});

/*
document.getElementById("transfer-amount").addEventListener("click", () => {
  const recipient = document.getElementById("recipient").value;
  const amount = document.getElementById("send-amount").value;
  const signature = document.getElementById("signature").value;
  const recovery = document.getElementById("recovery").value;

  const body = JSON.stringify({
    recipient,
    amount,
    signature,
    recovery,
  });

  const request = new Request(`${server}/send`, { method: "POST", body });

  fetch(request, { headers: { "Content-Type": "application/json" } })
    .then((response) => {
      return response.json();
    })
    .then(({ balance }) => {
      document.getElementById("balance").innerHTML = balance;
    });
});
*/
