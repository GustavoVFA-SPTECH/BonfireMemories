const database = require("../Database/config");

const newPost = async (title, caption, image, fkBuild, postOwner, type) =>{
    const dateTime = 'default';
    if(type == 'build'){
        database.executar(`INSERT INTO post VALUES(title, caption, image, dateTime, postOwner, fkBuild, type);`,
            [title, caption, image, dateTime, postOwner, fkBuild, type]);
    }else{
        database.executar(`INSERT INTO post VALUES(title, caption, image, dateTime, postOwner, type);`,
            [title, caption, image, dateTime, postOwner, type]);
    }
}