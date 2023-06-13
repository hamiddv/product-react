import {BsCheckLg} from "react-icons/bs";
import {useGlobalContextAPI} from "../context";

export function ProductColor(props) {
    const {id, color} = props.colorProperties
    //getting filters value and the function that change the value of filters (setActive)
    const {filteredProduct, setActive} = useGlobalContextAPI()
    //you change the value of filter by clicking on filter
    return (
        <div key={id} className={"col-2 mb-4 mb-2 pt-1"}>
            <label className="radio-container">
                <span className={`d-flex  justify-content-center align-items-center ${filteredProduct.color==color?"active":""}`}
                      onClick={() => setActive("color", color)}
                      style={{background: `#${color}`}}>
                    <BsCheckLg className={"text-white fw-bold"}/>
                </span>
            </label>
        </div>
    );
}