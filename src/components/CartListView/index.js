import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => {
    <CartContext.Consumer>
        {value => {
            const {cartList} = value

            return (
                
            )
        }}
    </CartContext.Consumer>
}
export default CartListView