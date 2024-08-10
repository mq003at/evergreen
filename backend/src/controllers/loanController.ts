import { Request, Response, NextFunction } from "express"
import { ILoan } from "../models/loan"
import { LoanService } from "../services/loanService"
import { BaseController } from "./baseController"

const loanService = new LoanService();

export class LoanController extends BaseController<ILoan>{
    constructor() {
        super(new LoanService())
    }

    public async readByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const loans = await loanService.findByUserId(id);
            res.status(200).json(loans)
        } catch (error) {
            res.json(400).json({ message: "There is a problem with this request."})
        }
    }
}