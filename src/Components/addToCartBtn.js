import {FaTrash} from "react-icons/fa";
import {AiOutlinePlus} from "react-icons/ai";
import {BiMinus} from "react-icons/bi";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useGlobalContextAPI} from "../context";

export function AddToCartBtn(props) {
    const {base_url} = useGlobalContextAPI()
    //getting product id by url parameters
    const params = useParams()
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const {productCount, setProductCount} = props
    console.log(productCount)
    const [maxCount, setMaxCount] = useState(10)
    const [loading, setLoading] = useState(false)

    async function changeProductCount() {
        setLoading(true)
        let requestInfo = {
            username,
            token,
            id: params.productId ? params.productId : props.productId,
            count: productCount !== null ? productCount : 0
        }
        try {
            let res = await axios.post(base_url + '/card/add-card/', requestInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 200) {
                setMaxCount(res.data.max_count)
                setProductCount(res.data.count)
            }
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        changeProductCount()
    }, [productCount])

    return (<div className={'d-flex align-items-baseline'}>
        {maxCount === 0 ?
            <p style={{fontWeight: 500}} className={"text-danger text-center"}>this product does not exist any
                more</p> : productCount === 0 ?
                <button className={"buy-btn btn "} style={{width: "7rem"}}
                        onClick={() => setProductCount(1)}>
                    {loading ? (
                        <svg className={'text-dark fs-1'} xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24"
                             viewBox="0 0 24 24">
                            <circle cx="18" cy="12" r="0" fill="currentColor">
                                <animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s"
                                         keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                         repeatCount="indefinite" values="0;2;0;0"/>
                            </circle>
                            <circle cx="12" cy="12" r="0" fill="currentColor">
                                <animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s"
                                         keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                         repeatCount="indefinite" values="0;2;0;0"/>
                            </circle>
                            <circle cx="6" cy="12" r="0" fill="currentColor">
                                <animate attributeName="r" begin="0" calcMode="spline" dur="1.5s"
                                         keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                         repeatCount="indefinite" values="0;2;0;0"/>
                            </circle>
                        </svg>) : "Add To Cart"}
                </button> : productCount === 1 ? (<>
                        <FaTrash className={"me-3 user-select-none text-muted"}
                                 onClick={() => setProductCount(null)}
                                 style={{cursor: "pointer"}}/>
                        <span className={"fs-5 user-select-none"}>{productCount}</span>
                        <AiOutlinePlus className={"ms-3 user-select-none"} style={{cursor: "pointer"}}
                                       onClick={() => maxCount !== productCount ? setProductCount(prevState => prevState + 1) : ""}/>
                    </>)
                    : (<>
                        <BiMinus className={"me-3 user-select-none"}
                                 onClick={() => setProductCount(prevState => prevState - 1)}
                                 style={{cursor: "pointer"}}/>
                        <span className={"fs-5 user-select-none"}>{loading ? (
                            <svg className={'text-dark fs-1'} xmlns="http://www.w3.org/2000/svg"
                                 width="24"
                                 height="24"
                                 viewBox="0 0 24 24">
                                <circle cx="18" cy="12" r="0" fill="currentColor">
                                    <animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s"
                                             keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                             repeatCount="indefinite" values="0;2;0;0"/>
                                </circle>
                                <circle cx="12" cy="12" r="0" fill="currentColor">
                                    <animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s"
                                             keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                             repeatCount="indefinite" values="0;2;0;0"/>
                                </circle>
                                <circle cx="6" cy="12" r="0" fill="currentColor">
                                    <animate attributeName="r" begin="0" calcMode="spline" dur="1.5s"
                                             keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                                             repeatCount="indefinite" values="0;2;0;0"/>
                                </circle>
                            </svg>) : productCount > maxCount ? maxCount : productCount}</span>
                        <AiOutlinePlus
                            className={`ms-3 user-select-none ${maxCount === productCount ? "opacity-50" : "opacity-100"}`}
                            style={{cursor: "pointer"}}
                            onClick={() => maxCount !== productCount ? setProductCount(prevState => prevState + 1) : ""}/>
                    </>)}
    </div>);
}