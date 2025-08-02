import React from "react";
import type { UseProductsContextType } from "./ProductsProvider"

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = React.createContext<UseProductsContextType | null>(initContextState);

export default ProductsContext;
