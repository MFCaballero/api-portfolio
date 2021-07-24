const { Rating } = require('../db');
const express = require("express");
const router = express.Router();

router.delete('/rating/:id', async (req, res, next) => {
    const id  = req.params.id;
    console.log(req.params.id)
    try
    {   
        id && await Rating.destroy( {
            where: {id}
        });

        return res.status(200).send("success");
    }
    catch(err){
        next(err);
        console.log(err);
        res.status(500).json(new Error("Error deleting the rating"))
    }
});

module.exports = router;