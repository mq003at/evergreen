import { CartController } from "../controllers/cartController";
import { authenticateAdmin, authenticateAlwaysForbidden, authenticateTokenUserOrAdmin } from "../middlewares/authentication";
import { ICart } from "../models/cart";
import { BaseRoutes } from "./baseRoutes";

export class CartRoutes extends BaseRoutes<ICart> {
    constructor(){
        super(new CartController());
    }

    protected initilizeRoutes() {
        this.router.get('/', authenticateAdmin, this.controller.getAll);
        this.router.get('/:id', authenticateTokenUserOrAdmin, this.controller.read);
        this.router.post('/', authenticateAlwaysForbidden)
        this.router.put('/:id', authenticateAlwaysForbidden);
        this.router.delete('/:id', authenticateAlwaysForbidden);
    }
}

const cartRoutes = new CartRoutes();
export default cartRoutes.router;