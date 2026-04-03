const db = require("../config/db");

exports.uploadPhoto = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { ptname, problem } = req.body;

    if (!req.files || !req.files.before || !req.files.after) {
      return res.status(400).json({
        success: false,
        error: "Before and After images required"
      });
    }

    const beforePhoto = req.files.before[0].path;
const afterPhoto = req.files.after[0].path;


   const sql = `
INSERT INTO photos (ptname, problem, before_photo, after_photo)
VALUES (?, ?, ?, ?)
`;

    await db.query(sql, [ptname, problem, beforePhoto, afterPhoto]);

    res.json({
      success: true,
      message: "Patient saved successfully"
    });

  } catch (err) {

    console.error("UPLOAD ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
};


// GET ALL
exports.getPhotos = async (req, res) => {

  try {

    const [rows] = await db.query(
      "SELECT * FROM photos ORDER BY id DESC"
    );

    res.json(rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


// DELETE
exports.deletePhoto = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM photos WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};