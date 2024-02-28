const express = require("express");
const router = express.Router();
const {pool} = require("./queries.js");

router.get('/', async (req, res) => {
  try{
 await pool.query('SELECT * FROM film', (error, results) => {
  if(error){
    res.status(500).send("Something went wrong!")
  } else {
  results = results.rows;
  res.json(results);
  }  
})
  }
  catch(error){
    console.log("Something went wrong!")
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const filmId = req.params.id;
    await pool.query('SELECT * FROM film WHERE film_id = $1', [filmId], (error, results) => {
      if (error) {
        res.status(500).send("Something went wrong!");
        console.log(error)
      } else {
        if (results.rows.length === 0) {
          res.status(404).send("Movie not found!");
        } else {
          const movie = results.rows[0];
          res.json(movie);
        }
      }
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.get('/category/:categoryid', async (req, res) => {
  try {
    const categoryId = req.params.categoryid;
    await pool.query(
      'SELECT * FROM film JOIN film_category ON film.film_id = film_category.film_id JOIN category ON film_category.category_id = category.category_id  WHERE category.category_id = $1', [categoryId], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          res.status(500).send("Something went wrong!");
        } else if (results.rows.length === 0) {
          res.status(404).send("No Movies of that category found!");
        } else {
          res.json(results.rows);
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send("Something went wrong!");
  }
});



module.exports = router;