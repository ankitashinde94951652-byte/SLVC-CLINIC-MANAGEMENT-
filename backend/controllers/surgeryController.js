const db = require('../config/db');

/* CREATE SURGERY */
exports.createSurgery = async (req, res) => {
  try {
    const { sid, ptname, sname, sdate, hospname, notes } = req.body;

    // ptid nasel tar null insert kara, error deu naka
    const finalPtid = sid || null;

    await db.query(
      "INSERT INTO surgery (ptid, ptname, sname, sdate, hospname, notes) VALUES (?,?,?,?,?,?)",
      [sid, ptname, sname, sdate, hospname, notes]
    );

    res.json({
      success: true,
      message: "Surgery saved successfully ✅"
    });

  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



/* GET ALL */

exports.getAllSurgeries = async (req,res)=>{

try{

const [rows] = await db.query("SELECT * FROM surgery ORDER BY sdate DESC");

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



/* UPDATE SURGERY */

exports.updateSurgery = async (req,res)=>{

try{

const {ptname,sname,sdate,hospname,notes} = req.body;

await db.query(

`UPDATE surgery
SET ptname=?, sname=?, sdate=?, hospname=?, notes=?
WHERE sid=?`,

[ptname,sname,sdate,hospname,notes,req.params.id]

);

res.json({
success:true,
message:"Surgery updated"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};



/* DELETE SURGERY */

exports.deleteSurgery = async (req,res)=>{

try{

await db.query(
"DELETE FROM surgery WHERE sid=?",
[req.params.id]
);

res.json({
success:true,
message:"Surgery deleted"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};


// const user = JSON.parse(localStorage.getItem("user"));
// if (!user) {
//     alert("User session expired. Please login again.");
//     return;
// }
// const ptid = user.id || user.ptid;