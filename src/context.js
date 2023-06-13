import React, {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useFetch} from "./useFetch";

const AppContext = React.createContext();
let token = localStorage.getItem('token')
let username = localStorage.getItem('username')

export function AppProvider({children}) {
    const freeShopping = useRef('')

    const base_url = 'http://localhost:8000'
    //checking if user has logged in
    const [isLogin, setLogin] = useState(false)
    //search input infos
    const [searchInput, setSearchInput] = useState('')
    //these are filters information
    const [filters, setFilters] = useState({maxprice: 0})
    const [aboutInfo, setAboutInfo] = useState({})
    const INITIAL_VALUE_OF_FILTERED_PRODUCTS = {
        category: "all",
        company: "all",
        color: "all",
        price: filters.maxprice !== 0 ? filters.maxprice : 0,
        freeShopping: false,
        sortBy: "Price (Highest)"
    }
    const [siteImages, setSiteImages] = useState()
    //this state belongs featured product in home page
    const [featuredProducts, setFeaturedProduct] = useState([{}, {}, {}])
    //this state belongs Custom Furniture services
    const [services, setServices] = useState([{}, {}])
    // this function well call useFetch hook and gives it the url and gets the response and set it in the dispatch function
    //this function gives 2 args:url:the url that you want to fetch data from,dispatch:this is for states.when you got the data from url now you need to set it in states
    async function FetchCaller(url, dispatch) {
        let res = await useFetch(url)
        dispatch(res.data)
    }

    //this is for the way the products going to show
    const [isSingleLineLayout, setSingleLineLayout] = useState(false)

    // this is for value of filters
    const [filteredProduct, setFilteredProduct] = useState(INITIAL_VALUE_OF_FILTERED_PRODUCTS)

    //this is for deploy filter as selected filter
    //it runs when you click on filter
    function setActive(key, value) {
        let newFilteredProducts = {}
        for (let i in filteredProduct) {
            if (i !== key) {
                newFilteredProducts[i] = filteredProduct[i]
            } else {
                newFilteredProducts[i] = value
            }
        }
        setFilteredProduct(newFilteredProducts)
    }

    //variable's value if is true then toggle layout is show
    const [isToggleLayout, setToggleLayout] = useState(false)
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 576) {
                setToggleLayout(true)
            } else {
                setToggleLayout(false)
            }
        })
        return () => {
            window.removeEventListener('resize')
        }
    }, [])

    const [displayedProducts, setDisplayedProducts] = useState(null)
    useEffect(() => {
        //getting site icon and hero section images
        FetchCaller(`${base_url}/home/api/image-icon/`, setSiteImages)
        // getting the featured product infos
        FetchCaller(`${base_url}/product/home/api/`, setFeaturedProduct)
        //getting the custom furniture services
        FetchCaller(`${base_url}/home/api/`, setServices)
        //getting filters
        FetchCaller(`${base_url}/product/filter-item/`, setFilters)
        //getting about page picture and title
        FetchCaller(`${base_url}/about/api/`, setAboutInfo)
        //getting products
        FetchCaller(`${base_url}/product/api/`, setDisplayedProducts)
    }, [])
    //every time user set a filter the function well runs
    useEffect(() => {
        let price = filteredProduct.price == 0 ? "-" : filteredProduct.price
        fetchProduct(price)
    }, [searchInput, filteredProduct.category, filteredProduct.color, filteredProduct.company, filteredProduct.sortBy, filteredProduct.freeShopping])

    //finding id of category and color and company
    function findId(Grouping, GroupingValue) {
        let id = null;
        filters[Grouping].forEach(value => {
            if (value[Grouping] === GroupingValue) {
                id = value.id
            }
        })
        return id
    }

    //when any filter defines this function runs
    function fetchProduct(price) {
        let url = `${base_url}/product/filter/${filteredProduct.category !== "all" ? findId("category", filteredProduct.category) : filteredProduct.category}/${filteredProduct.company !== "all" ? findId("company", filteredProduct.company) : filteredProduct.company}/${filteredProduct.color !== "all" ? findId("color", filteredProduct.color) : filteredProduct.color}/${price}/${filteredProduct.sortBy.slice(filteredProduct.sortBy.indexOf("(") + 1, filteredProduct.sortBy.indexOf("(") + 2)}/${filteredProduct.freeShopping.toString().slice(0, 1)}/${searchInput.trim() === "" ? "-" : searchInput}`
        url = url.replaceAll("all", "-")
        FetchCaller(url, setDisplayedProducts)
    }

    return (
        <AppContext.Provider value={{
            isLogin,
            setLogin,
            fetchProduct,
            FetchCaller,
            INITIAL_VALUE_OF_FILTERED_PRODUCTS,
            setActive,
            aboutInfo,
            displayedProducts,
            setDisplayedProducts,
            isToggleLayout,
            setFilteredProduct,
            filteredProduct,
            siteImages,
            featuredProducts,
            services,
            filters,
            setSingleLineLayout,
            isSingleLineLayout,
            searchInput,
            setSearchInput,
            base_url,
            freeShopping,
            token,
            username
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContextAPI = () => {
    return useContext(AppContext)
}

