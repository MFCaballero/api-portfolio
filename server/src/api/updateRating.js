const { Rating } = require('../db');
const express = require("express");
const router = express.Router();

router.put('/rating', async (req, res, next) => {

    let { score, comment, id } = req.body;
    
    try
    {
        await Rating.update({
            score,
            comment
        },
        { where: { userId: id} });

        return res.status(200).send("success");
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error updating"))
    }
});

module.exports = router;