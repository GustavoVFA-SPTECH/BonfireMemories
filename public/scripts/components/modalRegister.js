(function navBar() {
    const scriptParent = document.currentScript.parentElement;
    const page = document.currentScript.getAttribute("data-page");


    scriptParent.insertAdjacentHTML("beforeend", `
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
              <button class="buttonRegister">Back</button>
              <button class="buttonRegister">Register</button>
            </div>
          </div>
        </div>
      </div>
       `);
})();