import {Service} from "./Service";
import {useGlobalContextAPI} from "../context";

export function CustomFurniture() {
    const {services}=useGlobalContextAPI()
    return (
        <div className={"w-100 position-relative"} style={{background: "#eaded7"}}>
            <div className={"bg-white w-100 d-lg-block d-none start-0 position-absolute h-50"} style={{top:"71%"}}></div>
            <div className={"container"}>
                <div className={"row"} style={{paddingTop: "5rem", paddingBottom: "5rem"}}>
                    <div className={"col-lg-6"} style={{color: "#453227"}}>
                        <h2 className={"text-lg-start text-center"}>Custom Furniture</h2>
                        <h2 className={"ps-lg-5 text-lg-start text-center"}>Built Only For You</h2>
                    </div>
                    <div className={"col-lg-6 d-flex align-items-center"}>
                        <p className={"text-lg-start text-center"} style={{color: "#795744"}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis consectetur
                            reprehenderit non aliquam voluptates dolore aut vero consequuntur.
                        </p>
                    </div>
                </div>
                <div className={"container"}>
                    <div className={"row"}>
                        {services.map((service,index)=>{
                            return <Service key={index} serviceProperties={service}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}