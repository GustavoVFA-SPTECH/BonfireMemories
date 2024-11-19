function buildList() {
    const scriptParent = document.currentScript.parentElement;
    
    scriptParent.insertAdjacentHTML("beforeend", `
    <div class="listModal">
      <div class="buildList">
        <span class="listTitle">SaveBuilds</span>
        <div class="list">
            <div class="listItem">
                <span class="buildListName">Paladino</span>
                <span class="buildListLevel">120</span>
            </div>
        </div>
      </div>
    </div>
`);
};
buildList();