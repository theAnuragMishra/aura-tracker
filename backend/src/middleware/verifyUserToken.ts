import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyUserToken = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Access denied" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(403).send({ message: "Invalid credentials" });
    }
    req.user = user!;
    next();
  });
};
