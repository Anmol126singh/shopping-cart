import { useState } from 'react';
import  ProductList from './components/ProductList';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';




function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);
  const contentPage =  viewCart ? <Cart /> : <ProductList /> ;
  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {contentPage}
      <Footer viewCart={viewCart} />
    </>
  )
  return (
    <>
      {content}
    </>
  )
}

export default App
