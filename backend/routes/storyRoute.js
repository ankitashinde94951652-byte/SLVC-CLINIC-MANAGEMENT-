const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { upload } = require("../config/cloudinary");


/* ADD STORY */

router.post("/add", upload.single("photo"), async (req,res)=>{

try{

const name=req.body.name;
const disease=req.body.disease;
const story_text=req.body.story_text;
const youtube_url=req.body.youtube_url || "";

let photo_url="";

if(req.file){
photo_url=req.file.path;
}

const sql=`
INSERT INTO stories
(name,disease,story_text,photo_url,youtube_url)
VALUES (?,?,?,?,?)
`;

await db.query(sql,[name,disease,story_text,photo_url,youtube_url]);

res.json({success:true});

}catch(err){

console.log("ADD ERROR:",err);

res.status(500).json({
success:false,
error:err.message
});

}

});


/* GET ALL STORIES */

router.get("/",async(req,res)=>{

try{

const [rows]=await db.query("SELECT * FROM stories ORDER BY id DESC");

res.json(rows);

}catch(err){

console.log(err);

res.status(500).json({error:"server error"});

}

});


/* GET SINGLE STORY */

router.get("/:id",async(req,res)=>{

try{

const id=req.params.id;

const [rows]=await db.query("SELECT * FROM stories WHERE id=?",[id]);

if(rows.length===0){
return res.json(null);
}

res.json(rows[0]);

}catch(err){

console.log(err);

res.status(500).json({error:"server error"});

}

});


/* DELETE STORY */

router.delete("/:id",async(req,res)=>{

try{

const id=req.params.id;

await db.query("DELETE FROM stories WHERE id=?",[id]);

res.json({success:true});

}catch(err){

console.log(err);

res.status(500).json({error:"server error"});

}

});

module.exports=router;