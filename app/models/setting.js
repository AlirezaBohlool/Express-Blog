const db = require("@database/mysql");


exports.update = async (data)=>{
  console.log(data)
  Object.keys(data).forEach(dataKeys =>{
    db.query(`UPDATE setting SET value = ? WHERE name = ?`,[data[dataKeys],dataKeys]);
  })
} 


exports.findAll = async () => {
  const [result] = await db.query(
    ` SELECT *
      FROM setting
    `)
  return result
};

