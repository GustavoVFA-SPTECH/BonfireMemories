function modalPost() {
    const scriptParent = document.currentScript.parentElement;
  
    scriptParent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modalNewPost">
        <div class="newPostMain">
            <span class="newPostTitle">New Post</span>
            <div class="topDivNewPost">
                <div class="postInputs">
                    <input placeholder="Title" class="postInput" id="postTitle"/>
                    <select class="postInput" id="postType">
                        <option disabled selected value="#">Post type</option>
                        <option value="build">Build</option>
                        <option value="curiosity">Curiosity</option>
                    </select>
                    <select class="postInput" id="postBuild">
                        <option disabled selected value="#">Select a build</option>
                    </select>
                </div>
                <textarea placeholder="Post content" maxlength="255" id="postCaption" class="textAreaPost"></textarea>
            </div>
            <div class="bottomDivNewPost">
                <div class="previewPostImage">
                    <label for="iptPostImage">Upload image here</label>
                    <input id="iptPostImage" type="file">
                </div>
            </div>
            <div class="buttonsNewPost">
                <button class="postButton" onclick="closePost()">Back</button>
            </div>
        </div>
      </div>
         `
    );
}

modalPost();

function closePost() {
    const modalNewPost = document.querySelector(".modalNewPost");
    modalNewPost.style.display = "none";
}