import {useGlobalContextAPI} from "../context";
import {BsCheckLg} from "react-icons/bs"
import {useState} from "react";
import {CategoryList} from "./CategoryList";
import {CompanyList} from "./CompanyList";
import {ColorList} from "./ColorList";
import {MaxPrice} from "./MaxPrice";
import {useRef} from 'react'

export function Filters() {
    const {freeShopping} = useGlobalContextAPI()
    //getting search input value
    const {setSearchInput} = useGlobalContextAPI()
    //when user click on clear filter this funcion runs to set filters to initial state
    const {fetchProduct} = useGlobalContextAPI()
    //getting function that change the value of product filters (setActive)
    //setFilteredProduct is for clear all filters that INITIAL_VALUE_OF_FILTERED_PRODUCTS is its argument
    const {filters, setActive, INITIAL_VALUE_OF_FILTERED_PRODUCTS, setFilteredProduct} = useGlobalContextAPI()
    //these are for filter section
    const {category, color, company, maxprice, lowprice} = filters
    return (<div className={"col-lg-3"}>
            <div className="offcanvas-lg offcanvas-start" tabIndex="-1" id="filtersTab">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="filtersTab">filters</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                            data-bs-target={'#filtersTab'}></button>
                </div>
                <div className="offcanvas-body">
                    <div className={"w-100"}>
                        <div>
                            <div className="accordion mt-5" id="accordionPanel">
                                <div className="accordion-item border-0 border-bottom">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button bg-white collapsed shadow-none"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#panelsStayOpen-collapseOne">
                                            Category
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                                        <div className="accordion-body p-0">
                                            <CategoryList categories={category}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0 border-bottom">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed bg-white shadow-none"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#panelsStayOpen-collapseTwo">
                                            Company
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                        <div className="accordion-body p-0">
                                            <CompanyList companies={company}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0 border-bottom">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed bg-white shadow-none"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#panelsStayOpen-collapseThree">
                                            Colors
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                        <div className="accordion-body p-0 pb-2">
                                            <ColorList colors={color}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0 border-bottom">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed bg-white shadow-none"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#panelsStayOpen-collapseFour">
                                            Price
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                                        <div className="accordion-body p-0">
                                            <MaxPrice maxPrice={maxprice} minPrice={lowprice}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"d-flex justify-content-between p-3"}>
                            <span>Free Shopping</span>
                            <input ref={freeShopping}
                                   onChange={(event) => {
                                       console.log('on change')
                                       setActive("freeShopping", event.target.checked)
                                   }}
                                   className={"form-check-input"} style={{width: "1rem"}} type={"checkbox"}/>
                        </div>
                        <div className={"d-grid px-3  mt-4"}>
                            <button className={"btn btn-danger"}
                                    onClick={async () => {
                                        await setSearchInput('')
                                        freeShopping.current.checked = false
                                        await setFilteredProduct(INITIAL_VALUE_OF_FILTERED_PRODUCTS)
                                    }}>clear filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}