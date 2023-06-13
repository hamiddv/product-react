import {Company} from "./Company";
import {FilltersLoading} from "./FilltersLoading";
import {useGlobalContextAPI} from "../context";

export function CompanyList(props){
    //getting the value of product filters and the function that changes them
    const {filteredProduct,setActive}=useGlobalContextAPI()
    const {companies}=props
    // if company was not load it renders loading
    if(!companies){
        return <FilltersLoading/>
    }
    return(
        <ul style={{fontWeight: "600"}}>
            <li  className={"list-unstyled"}>
                <a href={"#"} onClick={()=>setActive("company","all")} className={`text-decoration-none ${filteredProduct.company=="all"?"active":""} category-name`}>All</a>
            </li>
            {companies.map(company => {
                return <Company key={company.id} companyProperties={company}/>
            })}
        </ul>
    );
}