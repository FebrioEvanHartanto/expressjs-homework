const express = require("express")
const router = express.Router();
const {pool} = require("./queries.js")

router.get('/', async (req, res) => {
  try{
    await pool.query('SELECT * FROM category', (error, result) => {
      if(error){
        console.log(error)
        console.log("Something went wrong!");
      }
      result = result.rows;
      res.json(result)
    })
  }catch(error){
    console.log("Error")
  }
})

module.exports = router;