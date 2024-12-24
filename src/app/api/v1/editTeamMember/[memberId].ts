/* eslint-disable consistent-return */
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

  const { memberId } = req.query;

  if (req.method === "PUT") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const memberIndex = teamMembers.findIndex(
      (member) => member.id === Number(memberId),
    );
    if (memberIndex === -1) {
      return res.status(404).json({ error: "Team member not found" });
    }

    teamMembers[memberIndex].name = name;
    res
      .status(200)
      .json({ success: true, updatedMember: teamMembers[memberIndex] });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
