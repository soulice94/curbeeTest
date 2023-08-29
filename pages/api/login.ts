import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  const response = await fetch('https://backend.billowing-truth-38ad.workers.dev/api/auth', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify({ username , password }),
    headers: { "Content-Type": "application/json", Accept: "application.json"},
  });
  const result = await response.json();
  const { token, message } = result;
  const cookies = new Cookies(req, res);
  if (token) {
    cookies.set('token', token);
    res.json({ success: true , token });
  } else {
    cookies.set('token', undefined);
    res.json({ message });
  }
}
