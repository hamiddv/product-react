import "../index.css"
import {useGlobalContextAPI} from "../context";

export function HeroSection() {
    const {base_url}=useGlobalContextAPI()
    //hero section images
    const {siteImages} = useGlobalContextAPI()
    //if hero section image was not load it renders the prload
    if (!siteImages) {
        return <div style={{width: "100%"}}>
            <div className={"container"} style={{height: "max-content", marginTop: "7rem"}}>
                <div className={"row"}>
                    <div className={"col-lg-6 d-flex mt-5 mt-lg-0 justify-content-center flex-column"}>
                        <h1 className={"fw-bold text-lg-start text-center"}>Design Your</h1>
                        <h1 className={"fw-bold text-lg-start text-center"}>Comfort Zone</h1>
                        <p className={"mt-5 lh-lg text-center text-lg-start  text-muted fs-4"}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis
                            doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero
                            et
                            quia
                            tempora excepturi quis alias?
                        </p>
                        <div className={"d-flex justify-content-center justify-content-lg-start"}>
                            <button className={"shadow text-white shop-btn"}>SHOP NOW</button>
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <div className={"position-relative d-none d-lg-flex ps-5 pt-5 justify-content-center"}>
                            <div style={{width: "15.635rem", height: "10.328125rem", left: "1%"}}
                                 className={"rounded-2 placeholder-wave placeholder position-absolute bottom-0 "}/>
                            <div style={{width: "27.5rem", height: "34.375rem"}}
                                 className={"rounded-2 placeholder-wave placeholder"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    } else {
        //if hero section image was load it renders them
        const {hero_image_one, hero_image_two} = siteImages[0]

        return (
            <div style={{width: "100%"}}>
                <div className={"container"} style={{height: "max-content", marginTop: "7rem"}}>
                    <div className={"row"}>
                        <div className={"col-lg-6 d-flex mt-5 mt-lg-0 justify-content-center flex-column"}>
                            <h1 className={"fw-bold text-lg-start text-center"}>Design Your</h1>
                            <h1 className={"fw-bold text-lg-start text-center"}>Comfort Zone</h1>
                            <p className={"mt-5 lh-lg text-center text-lg-start  text-muted fs-4"}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis
                                doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero
                                et
                                quia
                                tempora excepturi quis alias?
                            </p>
                            <div className={"d-flex justify-content-center justify-content-lg-start"}>
                                <button className={"shadow text-white shop-btn"}>SHOP NOW</button>
                            </div>
                        </div>
                        <div className={"col-6"}>
                            <div
                                className={"hero-section-image position-relative d-none d-lg-flex ps-5 pt-5 justify-content-center"}>
                                <img style={{width: "15.635rem", height: "10.328125rem", left: "1%"}}
                                     src={`${base_url}${hero_image_two}`}
                                     className={"rounded-2 position-absolute bottom-0 "}/>
                                <img style={{width: "27.5rem", height: "34.375rem"}}
                                     src={`${base_url}${hero_image_one}`}
                                     className={"rounded-2"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}