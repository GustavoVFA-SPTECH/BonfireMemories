function modalLogin() {
  const scriptParent = document.currentScript.parentElement;

  scriptParent.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modalLogin">
      <div class="mainLogin">
        <div class="loginContent">
          <div class="loginLogo"></div>
          <span class="loginLogoText">Bonfire Memories</span>
        </div>
        <div class="loginContent">
          <span class="loginText">Login</span>
          <div class="inputsLogin">
            <input class="inputLogin" type="text" placeholder="Username/Email" id="login"/>
            <input class="inputLogin" type="text" placeholder="Password" id="loginPassword"/>
          </div>
          <span class="errorMessageLogin">User or password incorrect</span>
          <div class="buttonsLogin">
            <button class="buttonLogin" id="loginButton">Login</button>
          </div>
            <span onclick="registerModal()">Register</span>
        </div>
      </div>
    </div>
       `
  );
}
modalLogin();

function login() {
  const login = document.getElementById("login").value;
  const password = document.getElementById("loginPassword").value;

  if (!login) {
    alert("Please enter your UserName");
    return;
  }
  if (!password) {
    alert("Please enter your password");
    return;
  }

  const data = {
    login: login,
    password: password,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) 
    .then((data) => {
      if (data.token) {     
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("UserID", data.idUser);
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("email", data.email);
       
        document.querySelector(".modalLogin").style.display = "none";
      } else {
        console.error("Token not received");
        document.querySelector(".errorMessageLogin").style.display = "flex";
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}

function checkTokenAndRedirect(redirectUrl) {
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    document.querySelector(".modalLogin").style.display = "flex";  
  }
  else{
    buttonBack();
  }
}

checkTokenAndRedirect('/views/homePage.html');

loginButton.addEventListener("click", login);

function buttonBack() {
  document.querySelector(".modalLogin").style.display = "none";
}

function registerModal() {
  document.querySelector(".modalLogin").style.display = "none";
  document.querySelector(".registerModal").style.display = "flex";
}
