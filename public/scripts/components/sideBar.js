function sideBar() {
    const scriptParent = document.currentScript.parentElement;


    scriptParent.insertAdjacentHTML("beforeend", `
        <div class="sideBar">
            <div class="sideButtons">
                <button class="sideButton"><a href="homepage.html">HomePage<a/></button>
                <button class="sideButton"><a href="buildCalculator.html">BuildCaculator<a/></button>
                <button class="sideButton" onclick="openNewPost()">NewPost</button>
                <button class="sideButton"><a href="dashboard.html">Dashboard<a/></button>
            </div>
        </div>
       `);
};

sideBar()

function openNewPost() {
    const modalNewPost = document.querySelector(".modalNewPost");
    modalNewPost.style.display = "flex";
}