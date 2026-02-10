import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = JSON.parse(req.body);

  const adminsPath = path.join(process.cwd(), ".db", "admins.json");
  const admins = JSON.parse(fs.readFileSync(adminsPath, "utf-8"));

  const admin = admins.find(a => a.username === username);
  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(200).json({ token });
}
