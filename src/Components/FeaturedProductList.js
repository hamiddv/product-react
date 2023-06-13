import "bootstrap/dist/css/bootstrap.min.css"
import "../index.css"
import {FeaturedProduct} from "./FeaturedProduct";
import {useGlobalContextAPI} from "../context";
import {Link} from "react-router-dom";

export function FeaturedProductList() {
    const {featuredProducts}=useGlobalContextAPI()
    return (
        <div className={"w-100 py-5"} style={{backgroundColor: "#f1f5f8",marginTop:"14rem"}}>
            <div className={"bg-inherit"}>
                <div>
                    <h1 className={"text-center"}>Featured Products</h1>
                    <div className={"d-flex justify-content-center mb-5"}>
                        <div className={"title-underline"}></div>
                    </div>
                </div>
                <div className={"pt-5"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            {featuredProducts.map((product,index)=>{
                                //this component renders the products preview section
                                //this component gets product information that comes from featured products in contex file
                                return <FeaturedProduct isHome={true} key={index} productProperties={product}/>
                            })}
                        </div>
                        <div className={"d-flex justify-content-center pt-4"}>
                            <Link to={'/products'} className={"btn shop-btn shadow text-white"}>ALL PRODUCTS</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}