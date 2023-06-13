import {useGlobalContextAPI} from "../context";
import {FilltersLoading} from "./FilltersLoading";

export function MaxPrice(props) {
    const {maxPrice, minPrice} = props

    //getting filters value and the function that change the value of filters (setActive)
    //also we are getting price the value of price input and the function that changes the value(setPrice)
    const {filteredProduct, setActive} = useGlobalContextAPI()
    //fetch products
    const {fetchProduct} = useGlobalContextAPI()
    // if prices was not load it renders the loading
    if (!maxPrice || !minPrice) {
        return <FilltersLoading/>
    }

    return (<ul>
        <p className={""}>${filteredProduct.price === 0 ? minPrice.toLocaleString() : Number(filteredProduct.price).toLocaleString()}</p>
        <input value={filteredProduct.price} onChange={(event) => {
            //changing the filter every time price changes
            setActive("price", event.target.value)

        }} onMouseUp={() => {
            let price = filteredProduct.price == 0 ? "-" : filteredProduct.price
            fetchProduct(price)
        }}
               type={"range"} min={minPrice} max={maxPrice}/>
    </ul>);
}