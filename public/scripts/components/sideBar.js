function sideBar() {
    const scriptParent = document.currentScript.parentElement;
    // const page = document.currentScript.getAttribute("data-page");


    scriptParent.insertAdjacentHTML("beforeend", `
        <div class="sideBar">
            <div class="sideButtons">
                <button class="sideButton">HomePage</button>
                <button class="sideButton">Build Calculator</button>
                <button class="sideButton">New Post</button>
            </div>
        </div>
       `);
};

sideBar()