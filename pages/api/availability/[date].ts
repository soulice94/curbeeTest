import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  const { date } = req.query;
  const token = cookies.get('token');
  const response = await fetch(`https://backend.billowing-truth-38ad.workers.dev/api/availability/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  const result = await response.json();
  return res.json({ result });
}
