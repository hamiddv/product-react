import {useGlobalContextAPI} from "../context";
import {FeaturedProduct} from "./FeaturedProduct";
import {ProductSingleLine} from "./ProductSingleLine";
import {FilltersLoading} from "./FilltersLoading";

export function ProductList() {
    //getting products layout and filters
    const {isSingleLineLayout, displayedProducts} = useGlobalContextAPI()
    //checking if displayedProducts is null we set loading
    if (displayedProducts) {
        return (
            <div className={"col-lg-9 col-12 mb-5"}>
                <div className={"row px-2 mt-5"}>
                    {displayedProducts?displayedProducts.map(product => {
                        return isSingleLineLayout ? <ProductSingleLine key={product.id} productProperties={product}/>
                            : <FeaturedProduct isHome={false} key={product.id} productProperties={product}/>
                    }):""}
                </div>
            </div>
        );
    }
}