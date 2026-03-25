const db = require("../config/db");

/* CREATE NOTE */

exports.createNote = async (req,res)=>{

try{

const {note,notedate} = req.body;

await db.query(

"INSERT INTO notes (note,notedate) VALUES (?,?)",

[note,notedate]

);

res.json({
success:true,
message:"Note saved successfully"
});

}catch(err){

console.error(err);

res.status(500).json({
success:false,
message:err.message
});

}

};


/* GET ALL NOTES */

exports.getNotes = async (req,res)=>{

try{

const [rows] = await db.query(
"SELECT * FROM notes ORDER BY nid DESC"
);

res.json({
success:true,
data:rows
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};


/* GET SINGLE NOTE */

exports.getNote = async (req,res)=>{

const [rows] = await db.query(

"SELECT * FROM notes WHERE nid=?",

[req.params.id]

);

res.json({
success:true,
data:rows[0]
});

};


/* UPDATE NOTE */

exports.updateNote = async (req,res)=>{

const {note,notedate} = req.body;

await db.query(

"UPDATE notes SET note=?, notedate=? WHERE nid=?",

[note,notedate,req.params.id]

);

res.json({
success:true,
message:"Note updated"
});

};


/* DELETE NOTE */

exports.deleteNote = async (req,res)=>{

await db.query(

"DELETE FROM notes WHERE nid=?",

[req.params.id]

);

res.json({
success:true,
message:"Note deleted"
});

};