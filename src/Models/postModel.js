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

const getPosts = async() => {
    try {
        const posts = await database.executar("SELECT * FROM post ORDER BY dateTime DESC"); // Consulta SQL para buscar posts
        return posts;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        throw error;
    }
}

const getPostById = async(idPost) => {
    try {
        const post = await database.executar(`SELECT * FROM post WHERE idPost = ?`, [idPost])
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