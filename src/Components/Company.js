import {useGlobalContextAPI} from "../context";

export function Company(props){
    const {id,company}=props.companyProperties
    //getting filters value and the function that change the value of filters (setActive)
    const {filteredProduct,setActive}=useGlobalContextAPI()
    //you change the value of filter by clicking on filter
    return(
        <li key={id} className={"list-unstyled"}>
            <a href={"#"}
               className={`text-decoration-none ${filteredProduct.company==company?"active":""} category-name`}
               onClick={()=>setActive("company",company)}>{company}</a>
        </li>
    );
}