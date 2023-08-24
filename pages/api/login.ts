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
  res.status(200).json(result);
}
