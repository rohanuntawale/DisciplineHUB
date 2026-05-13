import type { NextApiRequest, NextApiResponse } from "next";
import axios, { Method } from "axios";

const BACKEND_URL = "http://localhost:4000/api/schedule";
const ALLOWED: Method[] = ["GET", "POST", "PUT", "DELETE"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as Method | undefined;
  if (!method || !ALLOWED.includes(method)) {
    res.setHeader("Allow", ALLOWED);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const pathParts = req.query.path;
  const suffix = Array.isArray(pathParts) ? `/${pathParts.join("/")}` : "";

  try {
    const response = await axios({
      method,
      url: `${BACKEND_URL}${suffix}`,
      data: method === "GET" ? undefined : req.body,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true,
    });

    if (response.data === "") {
      return res.status(response.status).end();
    }
    return res.status(response.status).json(response.data);
  } catch {
    return res.status(502).json({ error: "Backend unreachable" });
  }
}
