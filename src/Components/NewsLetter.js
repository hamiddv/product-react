import "../index.css"
export function NewsLetter() {
    return (
        <div className={"container mt-5  pt-5"} style={{marginBottom:"7rem"}}>
            <div className={"row  mt-5"}>
                <div className={"col-lg-6"}>
                    <h1 className={"text-center text-lg-start"}>Join our newsletter and get 20% off</h1>
                    <p className={"text-muted  mt-3 text-center text-lg-start"}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat ratione
                        soluta veniam provident adipisci cumque eveniet tempore?
                    </p>
                </div>
                <div className={"col-lg-6 d-flex align-items-end mt-lg-0 mt-4 justify-content-center"}>
                    <div className={"row w-100 d-flex justify-content-center"}>
                        <div className={"col-11"}>
                            <form className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter Email"/>
                                <button type={"submit"} className="input-group-text email-button-submit-home" id="basic-addon2">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}