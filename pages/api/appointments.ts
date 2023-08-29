import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  const { size, after, before } = req.query;
  let URL = `https://backend.billowing-truth-38ad.workers.dev/api/appointments?size=${size}`;
  if (after) URL += `&after=${after}`;
  if (before) URL += `&before=${before}`;
  const token = cookies.get('token');
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return res.json({ result });
}
