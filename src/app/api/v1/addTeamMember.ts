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

export default function addMember(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;
  if (token !== "admin-token") {
    return res.status(403).json({ error: "Forbidden:Admin access only" });
  }

  if (req.method === "POST") {
    const { id, name, role } = req.body;
    if (!id || !name || !role) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newMember: TeamMember = { id, name, role };
    teamMembers.push(newMember);

    res.status(201).json({ success: true, newMember });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
  }
  return res.status(500).json({ error: "Unhandled server error" });
}
