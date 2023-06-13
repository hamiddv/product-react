import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useGlobalContextAPI} from "../context";
import {StarList} from "../Components/StarList";
import {ProductImageList} from "../Components/productImageList";
import {BsCheckLg} from "react-icons/bs";
import axios from "axios";
import {AddToCartBtn} from "../Components/addToCartBtn";

export function Product() {
    const {token, username} = useGlobalContextAPI()
    const [productCount, setProductCount] = useState(null)
    const {base_url} = useGlobalContextAPI()
    //product count
    const {FetchCaller} = useGlobalContextAPI()
    //getting product id by url parameters
    const params = useParams()
    //product information
    const [product, setProduct] = useState(null)
    //getting product id and setting it on product state
    useEffect(() => {
        FetchCaller(`${base_url}/product/api/detail/${params.productId}/`, setProduct)
    }, [])

    useEffect(() => {
        // this function gets the count of product
        getCount()
    }, [])

    async function getCount() {
        let requestInfo = {
            username,
            token,
            id: params.productId
        }
        try {
            let res = await axios.post(base_url + '/card/card-available/', requestInfo, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            if (res.status === 200) {
                setProductCount(res.data.count)
                console.log(res.data.count)
            }
        } catch (e) {

        }
    }

    if (product === null) {
        return <div className={"container pt-5"}>
            <div className={"row ms-0"}>
                <div className={"col-lg-5 ps-0 ps-lg-1  mb-lg-0 mb-4"}>
                    <div className={"rounded-2 placeholder placeholder-wave w-100"}
                         style={{height: "25rem"}}></div>
                </div>
                <div className={"col-lg-7  ps-lg-5 ps-0"}>
                    <div className={"container"}>
                        <div className={"row px-2 flex-column"}>
                            <div className={"col-4 mb-3 placeholder-lg placeholder placeholder-wave"}></div>
                            <div className={"d-flex mb-3 mb-2 ps-0 align-items-center"}>
                                <div className={"col-4 placeholder placeholder-wave"}></div>
                                <div className={"col-3 offset-1 placeholder placeholder-wave"}></div>
                            </div>
                            <div className={"placeholder mb-2 placeholder-wave col-4"}></div>
                            <div className={"placeholder mb-2 mt-5 placeholder-wave col-12"}></div>
                            <div className={"placeholder mb-2 placeholder-wave col-12"}></div>
                            <div className={"placeholder mb-2 placeholder-wave col-12"}></div>
                            <div className={"placeholder mb-2 placeholder-wave col-12"}></div>
                            <div className={"placeholder mb-2 placeholder-wave col-12"}></div>
                            <div className={"d-flex mb-3 mt-4 ps-0"}>
                                <div className={"placeholder placeholder-wave col-3"}></div>
                                <div className={"placeholder offset-1 placeholder-wave col-3"}></div>
                            </div>
                            <div className={"d-flex mb-3 ps-0"}>
                                <div className={"placeholder placeholder-wave col-3"}></div>
                                <div className={"placeholder offset-1 placeholder-wave col-3"}></div>
                            </div>
                            <div className={"d-flex mb-3 ps-0"}>
                                <div className={"placeholder placeholder-wave col-3"}></div>
                                <div className={"placeholder offset-1 placeholder-wave col-3"}></div>
                            </div>
                            <div className={"d-flex mb-3 ps-0"}>
                                <div className={"placeholder placeholder-wave col-3"}></div>
                                <div className={"placeholder offset-1 placeholder-wave col-3"}></div>
                            </div>
                        </div>
                        <hr/>
                        <div className={"row px-3 justify-content-between mb-5"}>
                            <div className={"col-3 placeholder placeholder-lg placeholder-wave"}></div>
                            <div className={"col-3 placeholder placeholder-lg placeholder-wave"}></div>
                        </div>
                    </div>
                </div>
                <div className={"col-lg-5 mt-5 mt-lg-0 position-relative"} style={{bottom: "4rem"}}>
                    <div className={"row"}>
                        <div className={"col-4 mt-3 mb-2 user-select-none"} style={{cursor: "pointer"}}>
                            <div style={{height: "5rem"}}
                                 className={`w-100 rounded-2 placeholder placeholder-wave`}></div>
                        </div>
                        <div className={"col-4 mt-3 mb-2 user-select-none"} style={{cursor: "pointer"}}>
                            <div style={{height: "5rem"}}
                                 className={`w-100 rounded-2 placeholder placeholder-wave`}></div>
                        </div>
                        <div className={"col-4 mt-3 mb-2 user-select-none"} style={{cursor: "pointer"}}>
                            <div style={{height: "5rem"}}
                                 className={`w-100 rounded-2 placeholder placeholder-wave`}></div>
                        </div>
                        <div className={"col-4 mt-3 mb-2 user-select-none"} style={{cursor: "pointer"}}>
                            <div style={{height: "5rem"}}
                                 className={`w-100 rounded-2 placeholder placeholder-wave`}></div>
                        </div>
                        <div className={"col-4 mt-3 mb-2 user-select-none"} style={{cursor: "pointer"}}>
                            <div style={{height: "5rem"}}
                                 className={`w-100 rounded-2 placeholder placeholder-wave`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    const {active_image, images, name, score, views, sku, price, description, available} = product[0]
    const {brand} = product[1]
    const {color} = product[2]

    return (
        <div className={"container pt-5"}>
            <div className={"row ms-0"}>
                <div className={"col-lg-5 ps-0 ps-lg-1  mb-lg-0 mb-4"}>
                    <img className={"rounded-2 w-100"} src={`${base_url}${active_image}`}
                         style={{height: "25rem"}}/>
                </div>
                <div className={"col-lg-7  ps-lg-5 ps-0"}>
                    <h1 style={{fontWeight: 400}}>{name}</h1>
                    <div className={"d-flex align-items-center"}>
                        <StarList starScore={score}/>
                        <span className={"ps-4"} style={{fontWeight: 400}}>{views} customer reviews</span>
                    </div>
                    <div>
                        <p style={{color: "#ab7a5f", fontWeight: 600}}
                           className={"pt-1 fs-4"}>${Number(price).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className={"text-muted"} style={{fontWeight: 600}}>{description}</p>
                    </div>
                    <div className={"row pb-2 align-items-baseline"}>
                        <div className={"col-sm-3"}>
                            <p className={"p-0 m-0"} style={{fontWeight: 500}}>Available :</p>
                        </div>
                        <div className={"col-sm-9"}>
                            <p className={"m-0 text-muted"}
                               style={{fontWeight: 500}}>{available ? "In Stock" : "Out Of Stock"}</p>
                        </div>
                    </div>
                    <div className={"row pb-2 align-items-baseline"}>
                        <div className={"col-sm-3"}>
                            <p className={"p-0 m-0"} style={{fontWeight: 500}}>SKU :</p>
                        </div>
                        <div className={"col-sm-9"}>
                            <p className={"m-0 text-muted"} style={{fontWeight: 500}}>{sku}</p>
                        </div>
                    </div>
                    <div className={"row pb-2 align-items-baseline"}>
                        <div className={"col-sm-3"}>
                            <p className={"p-0 m-0"} style={{fontWeight: 500}}>Brand :</p>
                        </div>
                        <div className={"col-sm-9"}>
                            <p className={"m-0 text-muted"} style={{fontWeight: 500}}>{brand}</p>
                        </div>
                    </div>
                    <div className={"row pb-2 align-items-end"}>
                        <div className={"col-sm-3"}>
                            <p className={"p-0 m-0"} style={{fontWeight: 500}}>color :</p>
                        </div>
                        <div className={"col-sm-9"}>
                            {color !== "None" ? (<span
                                className={"text-muted d-flex position-relative justify-content-center align-items-center rounded-circle d-block"}
                                style={{background: `#${color}`, width: "1.5rem", height: "1.5rem", top: ".2rem"}}>
                                <BsCheckLg className={"text-white fw-bold"}/>
                            </span>) : <p className={"m-0 text-muted"} style={{fontWeight: 500}}>No Color</p>}
                        </div>
                    </div>
                    <hr/>
                    <div className={"row justify-content-between align-items-center"}>
                        <div className={"col-4"}>
                            <span className={"fs-4"}>${Number(price).toLocaleString()}</span>
                        </div>
                        <div
                            className={`col-sm-4 ${productCount !== null ? "col-8" : "col-4"} d-flex justify-content-sm-center justify-content-end`}>
                            <small className={`${productCount ? "d-block" : "d-none"}`}>in the <Link to={'/cart'}
                                                                                                     className={"text-decoration-none"}
                                                                                                     style={{
                                                                                                         color: "#19bfd3",
                                                                                                         cursor: "pointer"
                                                                                                     }}>shopping
                                cart</Link></small>
                        </div>
                        <div
                            className={`col-sm-4 mt-sm-0 d-flex justify-content-sm-end justify-content-center ${productCount !== null ? "mt-4 col-12 " : "mt-0 col-4"} align-items-center `}>
                            {available ? <AddToCartBtn productCount={Number(productCount)}
                                                       setProductCount={setProductCount}/> : ""}
                        </div>
                    </div>
                </div>
                <div className={"col-lg-5 mt-5 mt-lg-0"}>
                    <div className={"row"}>
                        <ProductImageList productStuff={{product, setProduct, active_image}} productImages={images}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
