const {nanoid} = require('nanoid')
const URL = require('../Models/url')

async function handlerShortIDGenerate(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error:"Please provide URL"
        })
    }
    const shortID = nanoid(8);
    const url = await URL.create({
        short_ID : shortID,
        original_Url : body.url,
        click_History : [],
    })
    return res.status(200).json({
        shortId: shortID,
    })
}

async function handlerOriginalUrl(req,res){
    if(!req.body.shortId){
        return res.status(400).json({
            error: "please provide a short id"
        })
    }
    console.log(req.body.shortId)
    const id = req.body.shortId;
    const data = await URL.findOne({short_ID: id});
    console.log(data.original_Url);
    if(!data){
        return res.status(400).json({
            error:"The shortId doesnt exist"
        })
    }
    const original = data.original_Url;
    await URL.updateOne(
        {short_ID:id},    
        {$push: {click_History:Date.now()}}  //save click time
    )
    return res.redirect(original);
}

async function handlerAnalysis(req,res){
    const id = req.body.shortId;
    if(!id){
        return res.status(400).json({
            error:"Please provide short ID"
        })
    }
    const data = await URL.findOne({short_ID:id});
    if(!data){
        return res.status(400).json({
            error: "The short id does not exist"
        })
    }
    return res.status(200).json({
        shortID: id,
        countOfClicks: data.click_History.length, 
    })
}


module.exports ={
     handlerShortIDGenerate,
     handlerOriginalUrl,
     handlerAnalysis,
}


