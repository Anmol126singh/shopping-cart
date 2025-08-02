import type { ReactElement } from 'react';
import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';
import Product from './Product';
import type { producttype } from '../context/ProductsProvider';


const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts() ?? { products: [] };

  let pageContent: ReactElement | ReactElement[] = <p>loading...</p>;

  if (products.length) {
    pageContent = products.map((product: producttype) => {
      const inCart: boolean = cart.some(item => item.sku === product.sku);
      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  const content = (
    <main className="main main--products">
      {pageContent}
    </main>
  );

  return <>{content}</>;
};

export default ProductList;
