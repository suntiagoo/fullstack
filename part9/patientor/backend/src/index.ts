import * as dotenv from "dotenv";
import app from "./app";
dotenv.config();
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
