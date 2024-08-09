import { CartItemController } from "../controllers/cartItemController";
import { authenticateAlwaysForbidden, authenticateTokenUserOrAdmin } from "../middlewares/authentication";
import { ICartItem } from "../models/cartItem";
import { BaseRoutes } from "./baseRoutes";

export class CartRoutes extends BaseRoutes<ICartItem> {
    constructor(){
        super(new CartItemController());
    }

    protected initilizeRoutes() {
        this.router.get('/', authenticateAlwaysForbidden);
        this.router.get('/:id', authenticateAlwaysForbidden);
        this.router.post('', authenticateTokenUserOrAdmin, this.controller.create)
        this.router.put('/:id', authenticateTokenUserOrAdmin, this.controller.update);
        this.router.delete('/:id', authenticateTokenUserOrAdmin, this.controller.delete);
    }
}

const cartRoutes = new CartRoutes();
export default cartRoutes.router;