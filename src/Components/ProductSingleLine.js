import {BiSearchAlt2} from "react-icons/bi";
import "../index.css"
import {Link} from "react-router-dom";
import {useGlobalContextAPI} from "../context";

export function ProductSingleLine(props) {
    const {base_url}=useGlobalContextAPI()
    const {active_image, name, price,description,id} = props.productProperties
    if (!props.productProperties) {
        return <div className={"ps-5 row d-flex mb-5"}>
            <div className={"position-relative col-lg-4 p-0"} style={{height: "20rem", cursor: "pointer"}}>
                <div className={"h-100 placeholder placeholder-wave featured-product-img w-100 rounded-2"}></div>
            </div>
            <div className={"col-lg-8 p-4"}>
                <div className={"row p-4 flex-column"}>
                    <div className={"col-3 mb-4 placeholder placeholder-wave"}></div>
                    <div className={"col-1 placeholder-wave placeholder mb-4"}></div>
                    <div className={"col-8 placeholder-wave placeholder mb-2"}></div>
                    <div className={"col-3 placeholder-wave placeholder mb-3"}></div>
                    <div className={"col-2 placeholder-wave placeholder"}></div>
                </div>
            </div>
        </div>
    }
    return (
        <div className={"ps-lg-5 flex-lg-row flex-column d-flex mb-5"}>
            <div className={"position-relative col-lg-6 p-0"} style={{height: "20rem", cursor: "pointer"}}>
                <img src={base_url + active_image}
                     className={"h-100 featured-product-img w-100 rounded-2"}/>
                <Link to={`/product/${id}`} className={`product-image-backdrop`}>
                    <BiSearchAlt2 className={"text-white fs-1 rounded-circle p-1"} style={{background: "#ab7a5f"}}/>
                </Link>
            </div>
            <div className={"col-lg-6 d-flex justify-content-center flex-column p-4"}>
                <h3 style={{fontWeight: 400}}>{name}</h3>
                <p style={{color: "#b99179", fontWeight: 600}} >${price}</p>
                <p className={"text-muted pt-4"} style={{fontWeight:600}}>{description.slice(0,90)}...</p>
                <div className={"row mt-4"}>
                    <Link to={`/product/${id}`} className={"col-lg-4 text-decoration-none col d-grid"}>
                        <button className={"btn  see-more"}>Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}