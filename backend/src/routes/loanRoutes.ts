import { LoanController } from "../controllers/loanController";
import { authenticateAdmin, authenticateAlwaysForbidden, authenticateTokenUserOrAdmin } from "../middlewares/authentication";
import { ILoan } from "../models/loan";
import { BaseRoutes } from "./baseRoutes";

export class CartRoutes extends BaseRoutes<ILoan> {
    private loanController: LoanController;

    constructor(){
        super(new LoanController());
        this.loanController = this.controller as LoanController;
        this.initilizeRoutes();
    }

    protected initilizeRoutes() {
        this.router.get('/', authenticateAdmin, this.controller.getAll);
        this.router.get('/:id', authenticateTokenUserOrAdmin, this.loanController.readByUserId);
        this.router.post('/', authenticateTokenUserOrAdmin, this.controller.create)
        this.router.put('/:id', authenticateTokenUserOrAdmin, this.controller.update);
        this.router.delete('/:id', authenticateTokenUserOrAdmin, this.controller.delete);
    }
}

const cartRoutes = new CartRoutes();
export default cartRoutes.router;