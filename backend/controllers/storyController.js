const db = require("../config/db");

exports.addStory = async (req,res)=>{

try{

const {name,disease,storyText,youtubeUrl}=req.body;

let photo="";

if(req.file){
photo=req.file.path;
}

const sql=`
INSERT INTO stories (name,disease,story_text,photo_url,youtube_url)
VALUES (?,?,?,?,?)
`;

await db.query(sql,[name,disease,storyText,photo,youtubeUrl]);

res.json({
success:true,
message:"Story added"
});

}catch(err){

console.error(err);

res.status(500).json({
success:false,
error:err.message
});

}

};



exports.getStories = async(req,res)=>{

try{

const [rows]=await db.query(
"SELECT * FROM stories ORDER BY id DESC"
);

res.json(rows);

}catch(err){

res.status(500).json({
error:err.message
});

}

};



exports.deleteStory = async(req,res)=>{

try{

const {id}=req.params;

await db.query(
"DELETE FROM stories WHERE id=?",
[id]
);

res.json({
success:true
});

}catch(err){

res.status(500).json({
error:err.message
});

}

};