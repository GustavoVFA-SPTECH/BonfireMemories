const database = require("../Database/config");

const newPost = async (title, caption, image, fkBuild, postOwner, type) =>{
    if(type == 'build'){
        database.executar(`INSERT INTO post (title, caption, postImage, postOwner, fkBuild, type) VALUES (?,?,?,?,?,?);`,
            [title, caption, image, postOwner, fkBuild, type]);
    }else{
        database.executar(`INSERT INTO post (title, caption, postImage, postOwner, type) VALUES (?,?,?,?,?);`,
            [title, caption, image, postOwner, type]);
    }
}

module.exports = {
    newPost
}