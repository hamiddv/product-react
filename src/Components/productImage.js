import {useGlobalContextAPI} from "../context";

export function ProductImage(props) {
    const {base_url}=useGlobalContextAPI()
    
    const {setProduct, source, product, active_image} = props.productStuff

    //refactoring product variable by clicking on images.this function changes product active image
    function changeActiveImage() {
        let newProduct = []
        product.forEach((productInfoObject, index) => {
            if (index === 0) {
                newProduct.push({...productInfoObject, active_image: source})
            } else {
                newProduct.push(productInfoObject)
            }
            setProduct(newProduct)
        })
    }

    return (
        <div className={"col-4 mt-3 mb-2 user-select-none"} style={{cursor: "pointer"}}>
            <img onClick={() => changeActiveImage()}
                 src={`${base_url}${source}`} style={{height: "5rem"}}
                 className={`w-100 rounded-2 ${source === active_image ? "active" : ""} product-image`}/>
        </div>
    );
}