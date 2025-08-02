
import type { producttype } from "../context/ProductsProvider"
import type { CartReducerActionType,   CartActionType } from "../context/CartProvider"
import type { ReactElement } from "react"
import { memo } from "react"

type PropsType = {
    product: producttype,
dispatch: React.ActionDispatch<[action: CartActionType]>,
    REDUCER_ACTIONS:CartReducerActionType,
    inCart: boolean,
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement => {

    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    console.log(img)

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, quantity: 1 } })

    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null

    const content =
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img" />
            <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
        </article>

    return content
}

function areProductsEqual({ product: prevProduct, inCart: prevInCart }: PropsType, { product: nextProduct, inCart: nextInCart }: PropsType) {
    return (
        Object.keys(prevProduct).every(key => {
            return prevProduct[key as keyof producttype] ===
                nextProduct[key as keyof producttype]
        }) && prevInCart === nextInCart
    )
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct