function modalRegister() {
  const scriptParent = document.currentScript.parentElement;
  const page = document.currentScript.getAttribute("data-page");

  scriptParent.insertAdjacentHTML(
    "beforeend",
    `
    <div class="registerModal">
        <div class="registerMain">
          <div class="registerContent">
            <div class="registerLogo"></div>
            <span class="registerLogoText">Bonfire Memories</span>
          </div>
          <div class="registerContent">
            <span class="registerText">Register</span>
            <div class="inputsRegister">
              <input class="inputRegister" type="text" placeholder="Username" id="registerUserName"/>
              <input class="inputRegister" type="text" placeholder="Email" id="registerEmail"/>
              <input class="inputRegister" type="text" placeholder="Password" id="registerPassword"/>
              <input class="inputRegister" type="text" placeholder="Confirm password" id="registerConfirmPassword"/>
            </div>
            <div class="buttonsRegister">
              <button class="buttonRegister" onclick="buttonBack">Back</button>
              <button class="buttonRegister" id="registerButton">Register</button>
            </div>
          </div>
        </div>
      </div>
       `
  );
}

modalRegister();

function register() {
  const userName = document.getElementById("registerUserName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const Confpassword = document.getElementById("registerConfirmPassword").value;

  console.log({
    userName: userName,
    email: email,
    password: password,
    Confpassword: Confpassword,
  });

  if (!userName) {
    alert("Username is required");
    return;
  }
  if (!email) {
    alert("Email is required");
    return;
  }
  if (!password) {
    alert("Password is required");
    return;
  }
  if (!Confpassword) {
    alert("Confirm password is required");
    return;
  }
  if(password != Confpassword){
    alert("Passwords do not match");
    return;
  }

  const data = {
    userName: userName,
    email: email,
    password: password,
  };

  console.log(data)

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

registerButton.addEventListener("click", register);

function buttonBack(){
  document.querySelector(".modalRegister").style.display = "none";
}