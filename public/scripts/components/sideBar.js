function sideBar() {
    const scriptParent = document.currentScript.parentElement;
    // const page = document.currentScript.getAttribute("data-page");


    scriptParent.insertAdjacentHTML("beforeend", `
        <div class="sideBar">
            <div class="sideButtons">
                <button class="sideButton"><a href="homepage.html">HomePage<a/></button>
                <button class="sideButton"><a href="buildCalculator.html">BuildCaculator<a/></button>
                <button class="sideButton"><a href="homepage.html">NewPost<a/></button>
            </div>
        </div>
       `);
};

sideBar()