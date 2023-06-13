import "bootstrap/dist/css/bootstrap.min.css"
import {useGlobalContextAPI} from "../context";
import {BiSearchAlt2} from "react-icons/bi"
import {useState} from "react";
import {Link} from "react-router-dom";
export function FeaturedProduct(props){
    const {base_url}=useGlobalContextAPI()
    
    //a condition that define the cols of contaienr
    const {isHome}=props
    const {name,price,active_image,id}=props.productProperties
    //rendering the products
    if(name){
        return (
            <div className={`${isHome?"col-lg-4 col-12":"col-xl-4 col-md-6 col-12"}  mb-4`}>
                <div className={"position-relative"}  style={{height:"20rem",cursor:"pointer"}}>
                    <img src={`${base_url}`+active_image} className={"h-100 featured-product-img w-100 rounded-2"}/>
                    <Link to={`/product/${id}`} className={`product-image-backdrop`}
                    >
                        <BiSearchAlt2 className={"text-white fs-1 rounded-circle p-1"} style={{background:"#ab7a5f"}}/>
                    </Link>
                </div>
                <div className={"d-flex justify-content-between mt-3"}>
                    <div className={"col-6"}>
                        <p style={{fontWeight:"400"}}>{name}</p>
                    </div>
                    <div className={"col-4"}>
                        <p style={{fontWeight:"400",color:"#ab7a5f"}} className={"text-end"}>${Number(price).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        );
    }
    //if products was not load it renders loading
    return(
        <div className={`${isHome?"col-lg-4 col-12":"col-xl-4 col-md-6 col-12"}  mb-4`}>
            <div style={{height:"20rem"}} className={"w-100 placeholder placeholder-wave rounded-2"}></div>
            <div className={"d-flex justify-content-between mt-3"}>
                <div className={"col-4 placeholder placeholder-wave"}></div>
                <div className={"col-2 placeholder placeholder-wave"}></div>
            </div>
        </div>
    );
}