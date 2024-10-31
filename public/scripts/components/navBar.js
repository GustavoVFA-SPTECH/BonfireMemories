(function navBar() {
    const scriptParent = document.currentScript.parentElement;
    const page = document.currentScript.getAttribute("data-page");


    scriptParent.insertAdjacentHTML("beforeend", `
        <div class="navBar">
        <div class="divLogo">
            <img src="../../Assets/logo.png" alt="" class="logo">
            <span>Bonfire Memories</span>
        </div>
        <input type="text" class="searchBar" maxlength="50">
        <div class="navButtons">
            <button class="enterButton">Enter</button>
            <button class="profButton"></button>
        </div>
    </div>`);
})();