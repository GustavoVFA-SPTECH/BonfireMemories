function modalNewPost() {
    const scriptParent = document.currentScript.parentElement;
  
    scriptParent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modalNewPost">
        <div class="newPostMain">
            <span class="newPostTitle">New Post</span>
            <div class="topDivNewPost">
                <div class="postInputs">
                    <input placeholder="Title" class="postInput"/>
                    <select class="postInput">
                        <option disable value="#">Post type</option>
                    </select>
                    <select class="postInput">
                        <option disable value="#">Select a build</option>
                    </select>
                </div>
                <textarea placeholder="Post content" maxlength="255" id="" class="textAreaPost"></textarea>
            </div>
            <div class="bottomDivNewPost">
                <div class="previewPostImage">
                    <label for="iptPostImage">Upload image here</label>
                    <input id="iptPostImage" type="file">
                </div>
            </div>
            <div class="buttonsNewPost">
                <button class="postButton" onclick="closePost()">Back</button>
                <button class="postButton">Post</button>
            </div>
        </div>
      </div>
         `
    );
}

modalNewPost();

function closePost() {
    const modalNewPost = document.querySelector(".modalNewPost");
    modalNewPost.style.display = "none";
}