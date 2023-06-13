import {useGlobalContextAPI} from "../context";

export function About() {
    const {base_url}=useGlobalContextAPI()
    const {aboutInfo} = useGlobalContextAPI()
    //checking if about infos still not recived.it renders the preloading
    if (!aboutInfo[0]) {
        return <div className={"container mt-5 mb-5"}>
            <div className={"row pt-5"}>
                <div className={"col-lg-6 d-none  mb-5 d-lg-flex justify-content-center"}>
                    <div style={{width: "-webkit-fill-available", height: "35rem"}}
                         className={"rounded placeholder placeholder-wave"}/>
                </div>
                <div className={"ps-lg-5 col-lg-6 mb-lg-0 mb-5 d-flex align-items-lg-start flex-column align-items-center"}>
                    <div className={"row w-100  flex-column align-items-center align-items-lg-start"}>
                        <div className={"col-4 placeholder placeholder-lg placeholder-wave mt-5 mb-5"}></div>
                        <div className={"col-12 placeholder placeholder-wave mt-3"}></div>
                        <div className={"col-12 placeholder placeholder-wave mt-3"}></div>
                        <div className={"col-12 placeholder placeholder-wave mt-3"}></div>
                        <div className={"col-12 placeholder placeholder-wave mt-3"}></div>
                        <div className={"col-12 placeholder placeholder-wave mt-3"}></div>
                        <div className={"col-12 placeholder placeholder-wave mt-3"}></div>
                    </div>
                </div>
            </div>
        </div>
    }
    const {discription, img, title} = aboutInfo[0]
    return (
        <div className={"container mt-5 mb-5"}>
            <div className={"row pt-5"}>
                <div className={"col-lg-6 d-none  mb-5 d-lg-flex justify-content-center"}>
                    <img src={`${base_url}${img}`}
                         style={{width: "-webkit-fill-available", height: "35rem"}}
                         className={"rounded"}/>
                </div>
                <div
                    className={"ps-lg-5 col-lg-6 mb-lg-0 mb-5 d-flex align-items-lg-start flex-column align-items-center"}>
                    <h1>{title}</h1>
                    <div style={{width: "6rem", backgroundColor: "#ab7a5f", height: "4px"}} className={"mb-4"}></div>
                    <p className={"lh-lg text-lg-start text-center"} style={{color: "#617d98"}}>{discription}</p>
                </div>
            </div>
        </div>
    );
}