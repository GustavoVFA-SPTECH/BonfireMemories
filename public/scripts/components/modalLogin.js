function modalLogin() {
    const scriptParent = document.currentScript.parentElement;
    const page = document.currentScript.getAttribute("data-page");


    scriptParent.insertAdjacentHTML("beforeend", `
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
          <div class="buttonsLogin">
            <button class="buttonLogin"  onclick="buttonBack()">Back</button>
            <button class="buttonLogin" id="loginButton">Login</button>
          </div>
        </div>
      </div>
    </div>
       `);
};
modalLogin();

function login(){
  const login = document.getElementById("login").value;
  const password = document.getElementById("loginPassword").value;

  if(!login){
    alert("Please enter your UserName");
    return;
  }
  if(!password){
    alert("Please enter your password");
    return;
  }

  sessionStorage.UserName = login;
  sessionStorage.Password = password;

  const data = {
    login: login,
    password: password
  }

  console.log(data)

  fetch("/login",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

loginButton.addEventListener('click', login)

function buttonBack(){
  document.querySelector(".modalLogin").style.display = "none";
}

