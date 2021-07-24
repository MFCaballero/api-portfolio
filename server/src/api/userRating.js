const { Rating } = require('../db');
const express = require("express");
const router = express.Router();


router.get('/userRating/:id', async (req, res, next) => {
	const { id } = req.params.id;


    try{
		let ratings = await Rating.findAll()
		if(ratings.length > 0) {
			let data = await Rating.findOne({
				where: {userId: id}
			});
			data ? res.json(data) : res.send('no rating found');
		}
		res.send('no rating found');
	} 
	catch(err){
        next(err);
		res.json(err);
		console.log(err);
	}
});

module.exports = router;