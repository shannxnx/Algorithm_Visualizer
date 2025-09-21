import { AdminAuthDocument } from "../../models/auth.model";

declare module "express-serve-static-core" {
    interface Request {
        user?: AdminAuthDocument;
    }
}
