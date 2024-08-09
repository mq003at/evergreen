import { TokenPayload } from "./jwt";

// Define the type for the next function in middleware
export type NextFunction = (err?: any) => void;

// Global-modifying modules
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html

// declare global {
//     namespace Express {
//         interface Request {
//             tokenPayload?: TokenPayload
//         }
//     }
// }