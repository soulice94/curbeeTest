import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  const cookies = new Cookies(req, res);
  if (token) {
    cookies.set("token", token);
    res.json({ success: true });
  } else {
    cookies.set("token", undefined);
    res.json({ message: "No token provided" });
  }
}