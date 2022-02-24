const express = require('express');
const router = new express.Router();

router.get('',async (req,res) => {
    res.render('index',{
        title:"Chat app",
        link:"Chat Panel",
        copywrite:"dineshkashera",
        class:"chat-panel",
        intro_heading:'Chat Panel',
        intro_desc:'This is online chat panel, enjoy it!'
    });
});

module.exports = router;