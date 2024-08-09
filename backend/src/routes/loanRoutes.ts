import { authenticateAdmin, authenticateAlwaysForbidden, authenticateTokenUserOrAdmin } from "../middlewares/authentication";
import { ILoan } from "../models/loan";
import { BaseRoutes } from "./baseRoutes";

export class CartRoutes extends BaseRoutes<ILoan> {
    constructor(){
        super(new LoanController());
    }

    protected initilizeRoutes() {
        this.router.get('/', authenticateAdmin, this.controller.getAll);
        this.router.get('/:id', authenticateTokenUserOrAdmin, this.controller.read);
        this.router.post('/', authenticateTokenUserOrAdmin, this.controller.create)
        this.router.put('/:id', authenticateTokenUserOrAdmin, this.controller.update);
        this.router.delete('/:id', authenticateTokenUserOrAdmin, this.controller.delete);
    }
}

const cartRoutes = new CartRoutes();
export default cartRoutes.router;