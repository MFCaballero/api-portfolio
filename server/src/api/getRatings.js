const { User, Rating } = require('../db');
const express = require("express");
const router = express.Router();

router.get('/ratings', async (req, res, next) => {

    try{
		let data = await Rating.findAll({
			include: [{
                model: User,
				attributes: ['fullName']
            }],
		});
		return res.json(data);
	} 
	catch(err){
        next(err);
		res.json(err);
	}
});

module.exports = router;