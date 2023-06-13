import {useGlobalContextAPI} from "../context";

export function Category(props){
    const {category,id}=props.categoryProperties
    //getting filters value and the function that change the value of filters (setActive)
    const {filteredProduct,setActive}=useGlobalContextAPI()
    //you change the value of filter by clicking on filter
    return(
        <li key={id} className={"list-unstyled"}>
            <a href={"#"}
               className={`text-decoration-none ${filteredProduct.category==category?"active":""} category-name`}
            onClick={()=>setActive("category",category)}>{category}</a>
        </li>
    );
}