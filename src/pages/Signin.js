import {useState} from "react";
import {BiShow, BiHide} from "react-icons/bi"
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {useGlobalContextAPI} from "../context";

export function Signin() {
    const {base_url}=useGlobalContextAPI()
    
    const navigate=useNavigate();
    //the massage of error that sended from backend
    const [massage, setMassage] = useState('There is something wrong with username or password or email')
    //username input state
    const [username, setUsername] = useState("")
    //password input state
    const [password, setPassword] = useState("")
    //email input state
    const [email, setEmail] = useState("")
    const [isInvalid, setInvalid] = useState({username: false, password: false, email: false})

    //this function runs when you sumbit the form
    async function submitHandler(event) {
        event.preventDefault()
        //testing if inputs are not coordinated with their regex
        if (!isValid(username, /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/) || !isValid(password, /^[a-zA-Z0-9!@#$%^&*]{6,16}$/) || !isValid(email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setMassage('There is something wrong with username or password or email')
            setInvalidForm()
        } else {
            try {
                let res = await axios.post(`${base_url}/user/create-user/`, {
                    username: username,
                    password: password,
                    email: email
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                navigate(`/emailconfirmation/${username}/${email}/verify-email`)
            } catch (error) {
                console.log(error)
                if (error.response.status === 400) {
                    setMassage('This user already exists')
                    setInvalidForm()
                }
            }
        }
    }

    function isValid(inputValue, regex) {
        return regex.test(inputValue)
    }

    function setInvalidForm() {
        setUsername("")
        setPassword("")
        setEmail("")
        setInvalid({username: true, password: true, email: true})
    }

    //show password condition
    const [passwordShowed, setPasswordShow] = useState(false)
    return (<>
            <div className={"container pb-  5"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-4 d-flex justify-content-center"}>
                        <div
                            className={`toast ${isInvalid.username && isInvalid.email && isInvalid.password ? "toast-show" : ""} position-absolute`}
                            style={{top: ".6rem"}}>
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
                            <div>
                                <h2 style={{fontWeight: 400}} className={"text-center"}>Sign in</h2>
                            </div>
                            <div className={"pt-4"}>
                                <label className={"form-label fs-6"} style={{fontWeight: 400}}>Username</label>

                                <input onKeyPress={() => setInvalid({...isInvalid, username: false})} value={username}
                                       onChange={(event) => setUsername(event.target.value)}
                                       autoComplete={"off"} type={"text"} id={"username"}
                                       className={`form-control ${isInvalid.username ? "is-invalid  " : ""}`}
                                       name={"username"}/>
                            </div>
                            <div className={"pt-4"}>
                                <label className={"form-label fs-6"} style={{fontWeight: 400}}>Password</label>
                                <div className={"position-relative d-flex justify-content-end align-items-center"}
                                     style={{cursor: "pointer"}}>
                                    <input onKeyPress={() => setInvalid({...isInvalid, password: false})}
                                           value={password}
                                           onChange={(event) => setPassword(event.target.value)}
                                           autoComplete={"off"} type={passwordShowed ? "text" : "password"} id={"password"}
                                           className={`form-control pe-4 ${isInvalid.password ? "is-invalid  " : ""}`}
                                           name={"password"}/>

                                    {passwordShowed === false && isInvalid.password === false ?
                                        <BiShow className={"position-absolute me-2"} onClick={(event) => {
                                            setPasswordShow(true)
                                        }}/> : isInvalid.password === false ?
                                            <BiHide className={"position-absolute me-2"}
                                                    onClick={(event) => {
                                                        setPasswordShow(false)
                                                    }}/> : ""}
                                </div>
                            </div>
                            <div className={"pt-4"}>
                                <label className={"form-label fs-6"} style={{fontWeight: 400}}>Email</label>
                                <input onKeyPress={() => setInvalid({...isInvalid, email: false})} value={email}
                                       onChange={(event) => setEmail(event.target.value)}
                                       autoComplete={"off"} type={"email"} id={"email"}
                                       className={`form-control ${isInvalid.email ? "is-invalid    " : ""}`}
                                       name={"email"}/>
                            </div>
                            <div className={"pt-5"}>
                                <input type={"submit"} value={"Sign in  "}
                                       className={"form-control fs-6 shadow-none submit"}
                                       style={{fontWeight: 500, transition: "all ease-in 500ms"}}/>
                            </div>
                            <div className={"mt-2 d-flex justify-content-center"}>
                                <Link to={'/login'} className={"text-decoration-none text-center pt-3"} >Already have an
                                    account ?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}