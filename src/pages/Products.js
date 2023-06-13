import {Filters} from "../Components/filters";
import {SortBy} from "../Components/SortBy";
import {ProductList} from "../Components/ProductList";

export function Products(){
    return(
        <div className={"container mt-5"}>
            <div className={"row"}>
                <SortBy/>
                <Filters/>
                <ProductList/>
            </div>
        </div>
    );
}