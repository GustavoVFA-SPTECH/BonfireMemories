function navBar() {
    const scriptParent = document.currentScript.parentElement;
    // const page = document.currentScript.getAttribute("data-page");


    scriptParent.insertAdjacentHTML("beforeend", `
        <div class="navBar">
        <div class="divLogo">
            <img src="/Assets/logo.png" alt="" class="logo">
            <span>Bonfire Memories</span>
        </div>
        <input type="text" class="searchBar" maxlength="50">
        <div class="navButtons">
            <button class="profButton" onclick="buttonLogin()"></button>
        </div>
    </div>`);
};

function buttonLogin(){
    document.querySelector(".modalLogin").style.display = "flex";
}

navBar()