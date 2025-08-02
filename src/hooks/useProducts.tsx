import { useContext } from "react"
import ProductsContext from "../context/ProductsContext"
import type { UseProductsContextType } from "../context/ProductsProvider"

const useProducts = (): UseProductsContextType|null => {
    return useContext(ProductsContext)      
}

export default useProducts