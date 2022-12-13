const db = require("@database/mysql");

exports.findAll = async () => {
  const [result] = await db.query(`
        SELECT c.*,p.title
        FROM comments c
        join posts p ON c.post_id = p.id 
        ORDER BY c.created_at DESC
        `);
  return result;
};

exports.find = async (postId) => {
  const [result] = await db.query(
    `
        SELECT p.title
        FROM posts p WHERE id=?
        ORDER BY created_at DESC
        `,
    [postId]
  );
  return result;
};

exports.findByPostId = async (postId,status=1)=>{
  const [result] = await db.query(`
  select *
  from comments
  where post_id =?
  and status=?
  `,[postId,status])
  
  return result
}


exports.reject = async (commentId)=>{
  const [result] = await db.query("UPDATE comments SET status = 0 WHERE id=? LIMIT 1",[commentId])
  return result
} 


exports.accept = async (commentId)=>{
  const [result] = await db.query("UPDATE comments SET status = 1 WHERE id=? LIMIT 1",[commentId])
  return result
} 

exports.store = async (dataComment) => {
  const [result] = await db.query(`
  INSERT INTO comments 
  SET ?`, [dataComment]);
  
  return result.insertId;
};
