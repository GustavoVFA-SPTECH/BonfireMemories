function modalPost() {
    const scriptParent = document.currentScript.parentElement;
  
    scriptParent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="OpenmodalPost">
        <div class="OpenPostMain">
            <span class="OpenPostTitle" id="OpenPostTitle"></span>
            <div class="OpenTopDivPost">
                <div class="previewOpenPostImage" id='OpenPostImage'></div>
            </div>
            <div class="OpenBottomDivPost">
                <textarea disabled id="OpenPostCaption" class="textAreaOpenPost"></textarea>
                <span class='BuildCase'>Build: <a class='OpenPostBuildName' href=''></a></span>
            </div>
            <div class="buttonsNewPost">
                <button class="postButton" onclick="closePost()">Back</button>
            </div>
        </div>
      </div>
         `
    );
}
modalPost()
function closePost() {
    const OpenmodalPost = document.querySelector(".OpenmodalPost");
    OpenmodalPost.style.display = "none";
}