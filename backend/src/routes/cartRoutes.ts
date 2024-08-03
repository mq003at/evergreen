import { CartController } from "../controllers/cartController";
import { ICart } from "../models/cart";
import { BaseRoutes } from "./baseRoutes";

export class CartRoutes extends BaseRoutes<ICart> {
    constructor(){
        super(new CartController());
    }

    protected initilizeRoutes() {
        this.router.get('/:id', this.controller.read);
        this.router.put('/:id', this.controller.update)
    }
}

const cartRoutes = new CartRoutes();
export default cartRoutes.router;