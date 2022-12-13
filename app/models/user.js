const db = require("@database/mysql");
const bcrypt = require("@service/bycriptHash")

exports.findAll = async (data) => {
  const [result] = await db.query(
    ` SELECT ${data}
     FROM users
    `)
  return result
};

exports.find = async (userId) => {
  const [result] = await db.query(
    ` SELECT *
     FROM users 
     WHERE id=?
    `,[userId])

  return result.length > 0 ? result[0] : false
};

exports.findWithEmail= async (email) => {
  const [result] = await db.query(
    ` SELECT *
     FROM users 
     WHERE email=?
     LIMIT 1
    `,[email])

  return result.length > 0 ? result[0] : false ;
};


exports.store = async(data)=>{
  console.log(data)
  const hashPassword = bcrypt.hashing(data.password)
  const optimizedData = {...data,password:hashPassword}
  const [result] = await db.query(`INSERT INTO users SET ? `,[optimizedData])
  return result.insertId
} 


exports.delete =async (id)=>{
  const [result] = await db.query("DELETE FROM users WHERE id=? LIMIT 1",[id])
  return result
} 

exports.update = async (data,id)=>{
  const [result] = await db.query("UPDATE posts SET ? WHERE id=? LIMIT 1",[data,id])
  return result
} 