const db = require("@database/mysql");

exports.find = async (postId) => {
  const [result] = await db.query(
    ` SELECT *
      FROM posts 
      WHERE id=? 
    `,
    [postId]
  );

  return result.length > 0 ? result[0] : false;
};

exports.findAll = async (page = 1, perpage = 10) => {
  const offset = (page - 1) * perpage;
  const [result] = await db.query(
    ` SELECT p.*,u.ful_name
      FROM posts p
      LEFT join users u on p.author_id = u.id
      ORDER BY p.created_at DESC
      LIMIT ${offset},${perpage}
    `
  );
  return result;
};

exports.findAllPost = async () => {
  const [result] = await db.query(
    ` SELECT COUNT(id)
       AS postCount FROM posts
    `
  );
  return result[0].postCount;
};

exports.findBySlug = async (slug) => {
  const [row] = await db.query(
    ` SELECT *
      FROM posts 
      WHERE slug=? 
      LIMIT 1
    `,
    [slug]
  );
  return row[0];
};

exports.store = async (data) => {
  const [result] = await db.query(`INSERT INTO posts SET ? LIMIT 1`, [data]);
  return result.insertId;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM posts WHERE id=? LIMIT 1", [id]);
  return result;
};

exports.update = async (data, id) => {
  const [result] = await db.query("UPDATE posts SET ? WHERE id=? LIMIT 1", [
    data,
    id,
  ]);
  return result;
};

exports.findByKeyword = async (keyword) => {
  const [result] = await db.query(
    ` SELECT p.*,u.ful_name
      FROM posts p
      LEFT join users u on p.author_id = u.id
      WHERE p.title LIKE ?
      ORDER BY p.created_at DESC
    `,
    ["%" + keyword + "%"]
  );
  console.log(result);
  return result;
};
