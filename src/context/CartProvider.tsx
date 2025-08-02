import { createContext, useMemo, useReducer, type ReactElement } from "react";

export type CartItemType = {
    sku: string;
    name: string;
    price: number;
    quantity: number;
};

type CartStateType = {
    items: CartItemType[];
};

const initCartState: CartStateType = {
    items: []
};

const reducer_action_type = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
};

export type CartReducerActionType = typeof reducer_action_type;
export type CartActionType = {
    type: string;
    payload?: CartItemType | string;
};

const reducer = (state: CartStateType, action: CartActionType): CartStateType => {
    switch (action.type) {
        case reducer_action_type.ADD: {
            if (!action.payload || typeof action.payload === "string") {
                throw new Error('Invalid payload in ADD action');
            }

            const { sku, name, price } = action.payload;
            const filteredItems = state.items.filter(item => item.sku !== sku);
            const existingItem = state.items.find(item => item.sku === sku);
            const quantity = existingItem ? existingItem.quantity + 1 : 1;

            return {
                ...state,
                items: [...filteredItems, { sku, name, price, quantity }]
            };
        }
        case reducer_action_type.REMOVE: {
            if (!action.payload || typeof action.payload !== "string") {
                throw new Error('Invalid payload in REMOVE action');
            }

            const filteredItems = state.items.filter(item => item.sku !== action.payload);

            return { ...state, items: filteredItems };
        }
        case reducer_action_type.QUANTITY: {
            if (!action.payload || typeof action.payload === "string") {
                throw new Error('Invalid payload in QUANTITY action');
            }

            const { sku, quantity } = action.payload;
            const existingItem = state.items.find(item => item.sku === sku);
            if (!existingItem) {
                throw new Error('Item must exist to update quantity');
            }

            const updatedItem = { ...existingItem, quantity };
            const filteredItems = state.items.filter(item => item.sku !== sku);

            return { ...state, items: [...filteredItems, updatedItem] };
        }
        case reducer_action_type.SUBMIT:
            return { ...state, items: [] };
        default:
            throw new Error('Unidentified reducer action type');
    }
};


const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState);

    const REDUCER_ACTIONS = useMemo(() => reducer_action_type, []);

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(state.items.reduce((sum, item) => sum + item.quantity * item.price, 0));

    const cart = state.items.sort((a, b) => {
        const skuA = Number(a.sku.slice(-4));
        const skuB = Number(b.sku.slice(-4));
        return skuA - skuB;
    });

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: reducer_action_type,
    totalItems: 0,
    totalPrice: '',
    cart: [],
};

const CartContext = createContext<UseCartContextType>(initCartContextState);

type ChildrenType = {
    children?: ReactElement | ReactElement[];
};

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
