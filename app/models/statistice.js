const db = require("@database/mysql")

exports.totalUser = async ()=>{
    const [result] =await db.query("SELECT COUNT(id) AS totalUser FROM users")


    return result[0].totalUser
}

exports.totalComment = async ()=>{
    const [result] = await db.query("SELECT COUNT(id) AS totalcomment FROM comments")

    return result[0].totalcomment 
}

exports.totalPosts = async ()=>{
    const [result] =await db.query("SELECT COUNT(id) AS totalposts FROM posts")

    return result[0].totalposts
}

exports.totalView = async ()=>{
    const [result] =await db.query("SELECT SUM(view) AS totalview FROM posts")

    return result[0].totalview
}