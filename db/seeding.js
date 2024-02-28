var pool = require('../queries.js')
const fs = require('fs');

const seedQuery = fs.readFileSync('db/seeding.sql', {encoding: 'utf-8'}) 
  pool.pool.query(seedQuery, (err, res) => {
  if(err){
    console.log("Something went wrong!")
    console.log(err)
  }else{
    console.log("Seeding Completed!")
  }
  pool.pool.end();
});
