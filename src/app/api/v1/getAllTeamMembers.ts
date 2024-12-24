import { NextApiRequest, NextApiResponse } from "next";

type TeamMember = {
  id: number;
  name: string;
  role: string;
};

const teamMembers: TeamMember[] = [
  { id: 1, name: "Alice", role: "Developer" },
  { id: 2, name: "Bob", role: "Developer" },
];

export default function getTeamMember(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.headers.authorization;
  if (token !== "admin-token") {
    return res.status(403).json({ error: "Forbidden:Admin access only" });
  }

  if (req.method === "GET") {
    res.status(200).json({ success: true, teamMembers });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method notAllowed" });
  }
  return res.status(500).json({ error: "Unhandled server error" });
}
