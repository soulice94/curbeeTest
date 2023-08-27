import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  const { page, size } = req.query;
  const URL = `https://backend.billowing-truth-38ad.workers.dev/api/appointments?page=${page}&size=${size}`;
  const token = cookies.get('token');
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return res.json({ result });
}
