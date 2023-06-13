import {Category} from "./Category";
import {FilltersLoading} from "./FilltersLoading";
import {useGlobalContextAPI} from "../context";

export function CategoryList(props) {
    //getting the value of product filters and the function that changes them
    const {filteredProduct,setActive}=useGlobalContextAPI()

    const {categories} = props
    // if category was not load it renders loading
    if (!categories) {
        return <FilltersLoading/>
    }
    return (
        <ul style={{fontWeight: "600"}}>
            <li className={"list-unstyled"}>
                <a href={"#"}
                   onClick={()=>setActive("category","all")} className={`text-decoration-none ${filteredProduct.category=="all"?"active":""} category-name`}>All</a>
            </li>
            {categories.map(category => {
                return <Category key={category.id} categoryProperties={category}/>
            })}
        </ul>
    );
}