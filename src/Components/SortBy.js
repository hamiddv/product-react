import {GiHamburgerMenu} from "react-icons/gi"
import {TbLayoutGrid} from "react-icons/tb"
import {useGlobalContextAPI} from "../context";
import {TbFilters} from "react-icons/tb"
import {useEffect, useState} from "react";

export function SortBy() {
    //getting the value of product filters and the function that changes them
    const {filteredProduct, setActive} = useGlobalContextAPI()
    //getting products and the function that changes layout
    const {displayedProducts, setSingleLineLayout, isSingleLineLayout} = useGlobalContextAPI()
    //variable's value if is true then toggle layout is show and the function that changes the value
    const {isToggleLayout} = useGlobalContextAPI()
    //setFilteredProduct for searching product
    const {setFilteredProduct}=useGlobalContextAPI()
    //getting search input infos
    const {setSearchInput,searchInput}=useGlobalContextAPI()
    return (
        <div className={"col-12 px-3"}>
            <div className={"row align-items-center"}>
                <div className={"col-lg-3 col-10 px-3 p-1"}>
                    <input className={"form-control border-0"} style={{background: "#f1f5f8"}}
                         value={searchInput} onChange={(event)=>setSearchInput(event.target.value)}  placeholder={'Search'}/>
                </div>
                <div
                    className={'col-lg-1 col-2 position-relative  py-3 py-sm-0 justify-content-lg-start justify-content-end d-sm-flex'}>
                    <div style={{width: "2rem", height: "2rem"}} onClick={() => setSingleLineLayout(false)}
                         className={`justify-content-center ${!isSingleLineLayout && (isToggleLayout || window.innerWidth < 576) ? "z-2 opacity-0" : "z-3 "} layout-container-parent ${window.innerWidth < 576 || isToggleLayout ? "set-sm" : ""} align-items-center  rounded-1 d-flex me-2 border`}>
                        <label className={'layout-container'}>
                            <input type={"radio"} name={"layout"} defaultChecked={true}/>
                            <div className={"rounded-1"}>
                                <TbLayoutGrid className={"fs-2"}/>
                            </div>
                        </label>
                    </div>
                    <div style={{width: "2rem", height: "2rem"}} onClick={() => setSingleLineLayout(true)}
                         className={`justify-content-center ${isSingleLineLayout && (isToggleLayout || window.innerWidth < 576) ? "z-2 opacity-0" : "z-3 "}  ${window.innerWidth < 576 || isToggleLayout ? "set-sm" : ""} align-items-center  rounded-1 d-flex me-2 border`}>
                        <label className={'layout-container'}>
                            <input type={"radio"} name={"layout"}/>
                            <div className={"rounded-1"}>
                                <GiHamburgerMenu className={"fs-2"}/>
                            </div>
                        </label>
                    </div>
                </div>
                <div className={"col-2 d-none d-lg-block"}>
                    <div>
                        <span>{!displayedProducts ? "?" : displayedProducts.length} Products Found</span>
                    </div>
                </div>
                <div className={"col-lg-3 d-lg-block d-none bg-black"} style={{height: "1px"}}></div>
                <div className={"col-lg-3 d-lg-block d-flex justify-content-end"}>
                    <div className={"col pt-3 d-lg-none d-block"}>
                        <button className={"btn border fs-6"} data-bs-toggle={"offcanvas"}
                                data-bs-target={"#filtersTab"} style={{fontWeight: 400}}>
                            filters <TbFilters/>
                        </button>
                    </div>
                    <div className={"col pt-lg-0 pt-3 ps-2 d-flex align-items-center justify-content-end"}>
                        <span className={"me-2 d-sm-block d-none"}>Sort By</span>
                        <div className="dropdown-center">
                            <button className="btn bg-white border-0 dropdown-toggle" data-bs-toggle="dropdown">
                                {filteredProduct.sortBy}
                            </button>
                            <ul className="dropdown-menu">
                                <li onClick={(event) => {
                                    //changing the filter product every time sort by changes
                                    setActive("sortBy", event.target.textContent)
                                }}><a
                                    className="dropdown-item" href="#">Price (Lowest)</a></li>
                                <li onClick={(event) => {
                                    //changing the filter product every time sort by changes
                                    setActive("sortBy", event.target.textContent)
                                }}><a
                                    className="dropdown-item" href="#">Price (Highest)</a></li>
                                <li onClick={(event) => {
                                    //changing the filter product every time sort by changes
                                    setActive("sortBy", event.target.textContent)
                                }}><a
                                    className="dropdown-item" href="#">Name (A-Z)</a></li>
                                <li onClick={(event) => {
                                    //changing the filter product every time sort by changes
                                    setActive("sortBy", event.target.textContent)
                                }}><a
                                    className="dropdown-item" href="#">Name (Z-A)</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}