import {ProductColor} from "./ProductColor";
import {FilltersLoading} from "./FilltersLoading";
import {useGlobalContextAPI} from "../context";

export function ColorList(props) {
    //getting the value of product filters and the function that changes the value
    const {filteredProduct,setActive} = useGlobalContextAPI()

    const {colors} = props
    // if colors was not load it renders loading
    if (!colors) {
        return <FilltersLoading/>
    }
    return (
        <ul style={{paddingRight: "2rem"}}>
            <div className={"row justify-content-baseline"}>
                <div className={"col-2"}>
                    <label className="radio-container">
                        <span onClick={() => setActive("color", "all")}
                              className={`d-flex justify-content-center ${filteredProduct.color == "all" ? "active" : ""}`}
                              style={{bottom: "-.9rem", top: "initial"}}>All</span>
                    </label>
                </div>
                {colors.map(color => {
                    return <ProductColor key={color.id} colorProperties={color}/>
                })}
            </div>
        </ul>
    );
}