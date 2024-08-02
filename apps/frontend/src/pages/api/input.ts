import { NextApiRequest, NextApiResponse } from "next";

async function inputHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Wrong method" });
  }

  const { inputText } = req.body;
  if (inputText) {
    const url = "http://localhost:3001/bfhl";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputText })
      });
      return await res.json();
    } catch (e) {
      console.log(e);
    }
  }
}

export default inputHandler;
