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
              <input class="inputRegister" type="text" placeholder="Username"/>
              <input class="inputRegister" type="text" placeholder="Email" />
              <input class="inputRegister" type="text" placeholder="Password" />
              <input class="inputRegister" type="text" placeholder="Confirm password"/>
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