import {BiHide, BiShow} from "react-icons/bi";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useGlobalContextAPI} from '../context'
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function ForgetPassword() {
    const navigate = useNavigate();
    const {base_url} = useGlobalContextAPI()

    const [massage, setMassage] = useState('There is something wrong with email')
    //email input state
    const [email, setEmail] = useState("")
    const [isInvalid, setInvalid] = useState(false)

    //this function runs when you sumbit the form
    async function submitHandler(event) {
        event.preventDefault()
        //testing if inputs are not coordinated with their regex
        if (!isValid(email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setEmail("")
            setInvalid({email: true})
        } else {
            let emailRequstData = {
                email,
                new_code: true,
                new_password: false,
                code: false
            }
            try {
                let res = await axios.post(base_url + '/user/forget-password/', emailRequstData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(res.status)
                if (res.status === 201) {
                    navigate(`/emailconfirmation/false/${email}/forget-password`)
                }
            } catch (e) {
                if (e.response.status === 401) {
                    setMassage('email does not exist')
                    setInvalid(true)
                }
            }
        }
    }


    function isValid(inputValue, regex) {
        return regex.test(inputValue)
    }

    return (
        <>
            <div className={"container pb-5"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-4 d-flex justify-content-center"}>
                        <div
                            className={`toast ${isInvalid ? "toast-show" : ""} position-absolute`}
                            style={{top: ".5rem"}}>
                            <div className="toast-body text-center text-danger fw-bold">
                                {massage}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-100 h-100 py-5"} style={{background: "#333"}}>
                <div className={"container pb-5 "}>
                    <div className={"row justify-content-center"}>
                        <form onSubmit={(event) => submitHandler(event)}
                              className={"col-lg-4 p-4 col-8 rounded-2 bg-white"}>
                            <div className={"pt-4"}>
                                <label className={"form-label fs-6"} style={{fontWeight: 400}}>Email</label>
                                <input onKeyUp={(event) => event.key !== 'Enter' ? setInvalid(false) : console.log('')}
                                       value={email}
                                       onChange={(event) => setEmail(event.target.value)}
                                       autoComplete={"off"} type={"email"} id={"email"}
                                       className={`form-control ${isInvalid.email ? "is-invalid    " : ""}`}
                                       name={"email"}/>
                            </div>
                            <div className={"pt-5"}>
                                <input type={"submit"} value={"Confirm"}
                                       className={"form-control fs-6 shadow-none submit"}
                                       style={{fontWeight: 500, transition: "all ease-in 500ms"}}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}