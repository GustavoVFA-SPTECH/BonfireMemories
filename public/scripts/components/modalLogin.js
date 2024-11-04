(function navBar() {
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
            <button class="buttonLogin">Back</button>
            <button class="buttonLogin">Login</button>
          </div>
        </div>
      </div>
    </div>
       `);
})();
