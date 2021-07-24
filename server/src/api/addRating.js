const { User, Rating } = require('../db');
const express = require("express");
const router = express.Router();

router.post('/rating', async (req, res, next) => {
    let { score, comment, id } = req.body;

    try
    {
        let user = await User.findByPk( id );
        let ratings = await Rating.findAll()
        if(ratings.find(e => e.userId === id)) return res.status(400).send("user has already scored")
        let newRating = await Rating.create({
            score,
            comment
        });

        await user.addRating(newRating);
        return res.status(200).send("success");
        
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error creating the new rating"))
    }
});

module.exports = router;