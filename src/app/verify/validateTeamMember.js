// eslint-disable-next-line import/no-extraneous-dependencies
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const schema = require("../schema/teamMemberSchema");

const validate = ajv.compile(schema);

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({ errors: validate.errors });
  }

  res.status(200).json({ message: "TeamMember data is valid!" });
}
