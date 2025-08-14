import { AdminAuthDocument } from "../../models/auth.model"; // adjust path

declare module "express-serve-static-core" {
    interface Request {
        user?: AdminAuthDocument;
    }
}
