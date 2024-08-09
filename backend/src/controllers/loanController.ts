import { ILoan } from "../models/loan"
import { LoanService } from "../services/loanService"
import { BaseController } from "./baseController"

export class LaonController extends BaseController<ILoan>{
    constructor() {
        super(new LoanService())
    }
}