import React, { type ChangeEvent, type ReactElement } from 'react'
import type { CartActionType, CartItemType, CartReducerActionType } from '../context/CartProvider'
type PropsType={
    item:CartItemType,
    dispatch:React.ActionDispatch<[action: CartActionType]>,
    REDUCER_ACTIONS:CartReducerActionType;

}
const CartLineItem = ({item,dispatch,REDUCER_ACTIONS}:PropsType) => {
      const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href;
      const lineTotal:number = (item.quantity*item.price);
      const highestquatity:number = 20 > item.quantity?20:item.quantity;
      const optionalValues :number[]= [...Array(highestquatity).keys()].map(i=>i+1);
      const options : ReactElement[]= optionalValues.map(val =>{
        return <option key={`opt${val}`} value={val}>{val}</option>
      })
      const onChangeqty= (e:ChangeEvent<HTMLSelectElement>)=>{
        dispatch({
            type:REDUCER_ACTIONS.QUANTITY,
            payload:{...item, quantity: Number(e.target.value)}
        })

      }
      const onRemovefromCart = ()=> dispatch({type:REDUCER_ACTIONS.REMOVE,payload:item.sku})
      const Content = (
            <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</div>

            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label>
            <select
                name="itemQty"
                id="itemQty"
                className="cart__select"
                value={item.quantity}
                aria-label="Item Quantity"
                onChange={onChangeqty}
            >{options}</select>

            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
            </div>

            <button
                className="cart__button"
                aria-label="Remove Item From Cart"
                title="Remove Item From Cart"
                onClick={onRemovefromCart}
            >
                ❌
            </button>
        </li>
      )
  return (
    <div>{Content}</div>
  )
}

export default CartLineItem