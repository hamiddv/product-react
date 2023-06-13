import {ProductImage} from "./productImage";

export function ProductImageList(props) {
    //getting all of 5 product image
    const {productImages}=props
    //getting product images and set product function for setting the image for active image an of course getting active image
    //we are sending productStuff to component
    const {productStuff}=props
    return (
        <>
            {productImages.map((source,index) => {
                return (
                    <ProductImage key={index} productStuff={{...productStuff,source}}/>
                )
            })}
        </>
    )
}