const db = require("../config/db");

// CREATE
// CREATE NOTE (Fakt note ani date sathi)
exports.createNote = async (req, res) => {
    try {
        const { note, notedate } = req.body;
        const finalDate = notedate === "" ? null : notedate;

        // Query madhun ptid kadhun takla aahe
        const [result] = await db.query(
            "INSERT INTO notes (note, notedate) VALUES (?, ?)",
            [note, finalDate]
        );

        res.json({
            success: true,
            message: "Note saved successfully",
            id: result.insertId
        });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE (Haa missing asu shakto tumcha)
exports.updateNote = async (req, res) => {
    try {
        const { note, notedate } = req.body;
        const finalDate = notedate === "" ? null : notedate;

        await db.query(
            "UPDATE notes SET note=?, notedate=? WHERE nid=?",
            [note, finalDate, req.params.id]
        );

        res.json({ success: true, message: "Note updated!" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
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