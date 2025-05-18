import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token, authorization denied" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded; // attaches { id: ... } from the token
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
