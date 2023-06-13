import {Link} from "react-router-dom";

export function NotFound() {
    return (
        <div className={"container mt-5 d-flex justify-content-center flex-column"}>
            <h2 className={"text-center mb-3 lh-lg"} style={{color: "#ab7a5f"}}>The page you are looking for does not exist</h2>
            <Link to={"/"} className={"text-center text-decoration-none text-muted"} >{"<<Go back home>>"}</Link>
        </div>
    );
}