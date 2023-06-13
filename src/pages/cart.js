import {useEffect, useState} from "react";
import axios from "axios";
import {useGlobalContextAPI} from "../context";
import {UserBasketProduct} from "../Components/userBasketProduct";
import "../dist/css/App.css"

export function Cart() {
    const {token, username} = useGlobalContextAPI()
    const [basketProducts, setBasketProducts] = useState([])
    const {base_url} = useGlobalContextAPI()
    let requestInfo = {
        token,
        username
    }

    async function fetchData() {
        try {
            let res = await axios.post(base_url + '/card/get-card/', requestInfo, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            if (res.status === 200) {
                setBasketProducts(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <div className={'container my-5'}>
                <div className={"row"}>
                    <div className={"col-lg-8 col-12"}>
                        {basketProducts.map((product, index) => {
                            return <UserBasketProduct productProps={product} key={product.id}/>
                        })}
                    </div>
                    <div className="col-lg-4 col-12">
                        <div
                            className="flex-column border rounded-2 position-sticky shadow-lg top-0 my-lg-3 my-0 p-3">
                            <div className={"d-flex mb-2 justify-content-between align-items-baseline"}>
                                <h5 style={{fontWeight: 400}}>total price:</h5>
                                <small style={{fontWeight: 400}}>2,000,000,000</small>
                            </div>
                            <div className={"d-flex mb-2 justify-content-between align-items-baseline"}>
                                <p style={{fontWeight: 200}}>Emperor Bed:</p>
                                <small style={{fontWeight: 400}}>1,000,000 ( 1 )</small>
                            </div>
                            <div className={"d-flex mb-4 justify-content-between align-items-baseline"}>
                                <p style={{fontWeight: 200}}>Modern Poster:</p>
                                <small style={{fontWeight: 400}}>1,999,000,000 ( 1 )</small>
                            </div>
                            <div className={"d-grid"}>
                                <button className={"btn btn-primary"}>Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}