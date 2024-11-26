const database = require("../Database/config");

const newPost = async (title, caption, image, fkBuild, postOwner, type) =>{
    if(type == 'build'){
        database.executar(`INSERT INTO Post (title, caption, postImage, postOwner, fkBuild, type) VALUES (?,?,?,?,?,?);`,
            [title, caption, image, postOwner, fkBuild, type]);
    }else{
        database.executar(`INSERT INTO Post (title, caption, postImage, postOwner, type) VALUES (?,?,?,?,?);`,
            [title, caption, image, postOwner, type]);
    }
}

const getPosts = async() => {
    try {
        const posts = await database.executar("SELECT * FROM Post ORDER BY dateTime DESC");
        return posts;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        throw error;
    }
}

const getPostById = async(idPost) => {
    try {
        const post = await database.executar(`SELECT * FROM Post WHERE idPost = ?`, [idPost])
        return post;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    newPost,
    getPosts,
    getPostById,
}