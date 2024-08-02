const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid data format" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highest_alphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => (a > b ? a : b))] : [];

  const response = {
    is_success: true,
    user_id: "sai_rohit_sanniboyina",
    email: "ss0220.@srmist.edu.in",
    roll_number: "RA2111003020656",
    numbers,
    alphabets,
    highest_alphabet
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
