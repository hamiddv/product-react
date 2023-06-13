import {StarList} from "./StarList";
import {Link} from "react-router-dom";
import {AddToCartBtn} from "./addToCartBtn";
import {useState} from "react";
import {BsCheckLg} from "react-icons/bs";
import {useGlobalContextAPI} from "../context";

export function UserBasketProduct(props) {
    const {base_url}=useGlobalContextAPI()
    const {count} = props.productProps
    const {sku, color, company, name, score, available, price,active_image,id} = props.productProps.product
    const [productCount, setProductCount] = useState(count)
    return (<>
        <div className={'col-12 p-3 rounded-2'}>
            <div className={'row user-basket-product shadow p-3'}>
                <div className={'col-lg-4 align-items-center d-flex'}>
                    <img style={{height: "18rem"}} className={'w-100 rounded-2'} src={base_url+active_image}/>
                </div>
                <div className={'col-lg-8 mt-3 mt-sm-0 d-flex flex-column px-5'}>
                    <div className={"ps-2"}>
                        <div className={"row w-100 align-items-baseline"}>
                            <div className={"col-md-6 mt-4 mt-lg-0"}>
                                <h5 style={{fontWeight: 400}} className={"text-primary"}>{name}</h5>
                            </div>
                            <div className={'col-md-6 d-flex mt-3 mt-md-0 align-items-baseline justify-content-md-end'}>
                                <StarList starScore={score}/>
                            </div>
                            <div className="col-12 mb-3 mt-4 align-items-baseline">
                                <div className={'row'}>
                                    <div className="col-6">
                                        <p className="p-0 m-0"
                                           style={{fontWeight: "500"}}>Available :</p>
                                    </div>
                                    <div className="col-6 col-md-6 ps-md-4"><p
                                        className="m-0 text-muted text-end"
                                        style={{fontWeight: "500"}}>{available ? 'In Stuck' : "Out Of Stuck"}</p></div>
                                </div>
                            </div>
                            <div className={"col-12 mb-3 align-items-baseline"}>
                                <div className={'row'}>
                                    <div className={"col-6"}>
                                        <p className={"p-0 m-0"} style={{fontWeight: 500}}>Price :</p>
                                    </div>
                                    <div className={"col-6 col-md-6 ps-md-4"}>
                                        <p className={"m-0 text-end text-muted"}
                                           style={{fontWeight: 500}}>${Number(price).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-12 mb-3 align-items-baseline"}>
                                <div className={'row'}>
                                    <div className={"col-6"}>
                                        <p className={"p-0 m-0"} style={{fontWeight: 500}}>SKU :</p>
                                    </div>
                                    <div className={"col-6 col-md-6 ps-md-4"}>
                                        <p className={"m-0 text-end text-muted"} style={{fontWeight: 500}}>{sku}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-12 mb-3 align-items-baseline"}>
                                <div className={'row'}>
                                    <div className={"col-6"}>
                                        <p className={"p-0 m-0"} style={{fontWeight: 500}}>Brand :</p>
                                    </div>
                                    <div className={"col-6 col-md-6 ps-md-4"}>
                                        <p className={"m-0 text-end text-muted"} style={{fontWeight: 500}}>{company}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"col-12 mb-3 align-items-end"}>
                                <div className={'row'}>
                                    <div className={"col-6"}>
                                        <p className={"p-0 m-0"} style={{fontWeight: 500}}>color :</p>
                                    </div>
                                    <div className={"col-6 text-end justify-content-end d-flex  col-md-6 ps-md-4"}>
                                        {color !== "None" ? (<span
                                            className={"text-muted d-flex position-relative justify-content-center align-items-center rounded-circle d-block"}
                                            style={{
                                                background: `#${color}`,
                                                width: "1.5rem",
                                                height: "1.5rem",
                                                top: ".2rem"
                                            }}>
                                <BsCheckLg className={"text-white fw-bold"}/>
                            </span>) : <p className={"m-0 text-muted"} style={{fontWeight: 500}}>No Color</p>}
                                    </div>
                                </div>
                            </div>
                            <div className={"col-12 mt-3"}>
                                <div className={"row align-items-baseline"}>
                                    <div className={"col-6"}>
                                        <p style={{color: "rgb(171, 122, 95)", fontWeight: 600}}>$2,000,000</p>
                                    </div>
                                    <div className={"col-6 d-flex  justify-content-end"}>
                                        <AddToCartBtn productId={id} productCount={productCount} setProductCount={setProductCount}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}