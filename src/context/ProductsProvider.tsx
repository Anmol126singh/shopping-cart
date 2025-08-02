import  { useState, type ReactElement } from "react";
import ProductsContext from "./ProductsContext";


export type producttype = {
  sku: string;
  name: string;
  price: number;
};

export type UseProductsContextType = {
  products: producttype[];
};

const initState: producttype[] = [
  { sku: "item0001", name: "Widget", price: 9.99 },
  { sku: "item0002", name: "Premium Widget", price: 19.99 },
  { sku: "item0003", name: "Deluxe Widget", price: 29.99 },
];

type ChildrenType = { children: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products] = useState<producttype[]>(initState);
  const value: UseProductsContextType = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsProvider;
