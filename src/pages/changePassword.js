import {useGlobalContextAPI} from "../context";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {BiHide, BiShow} from "react-icons/bi";

export function ChangePassword() {
    const {base_url} = useGlobalContextAPI()
    const params = useParams()
    const navigate = useNavigate();
    //the massage of error that sended from backend
    const [massage, setMassage] = useState({
        text: "'There is something wrong with new password or Confirmation password'",
        condition: false
    })
    //username input state
    const [confirmPassword, setConfirmPassword] = useState("")
    //password input state
    const [newPassword, setNewPassword] = useState("")
    const [isInvalid, setInvalid] = useState({ConfirmPassword: false, newPassword: false})

    //this function runs when you sumbit the form
    async function submitHandler(event) {
        event.preventDefault()
        //testing if inputs are not coordinated with their regex
        if (!isValid(newPassword, /^[a-zA-Z0-9!@#$%^&*]{6,16}$/) || newPassword !== confirmPassword) {
            setMassage({condition: true, text: 'There is something wrong with new password or confirmation password '})
            setInvalidForm()
        } else {
            console.log('s')
            let passwordInfo = {
                email: params.email,
                new_code: false,
                new_password: newPassword,
                code: false
            }
            try {
                let res = await axios.post(base_url + '/user/forget-password/', passwordInfo, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (res.status === 200) {
                    navigate('/login')
                }
            } catch (e) {
                if (e.response.status === 401) {
                    setMassage({condition: true, text: 'something went wrong'})
                    setInvalid({newPassword: true, ConfirmPassword: true})
                }
            }
        }
    }

    function isValid(inputValue, regex) {
        return regex.test(inputValue)
    }

    function setInvalidForm() {
        setNewPassword("")
        setConfirmPassword('')
        setInvalid({newPassword: true, ConfirmPassword: true})
    }

    //show password condition
    const [passwordShowed, setPasswordShow] = useState({newPassword: false, passwordConfirmation: false})
    return (
        <>
            <div className={"container"}>
                <div className={"row justify-content-center"}>
                    <div className={"col-4 d-flex justify-content-center"}>
                        <div
                            className={`toast ${massage.condition ? "toast-show" : ""} position-absolute`}
                            style={{top: ".6rem"}}>
                            <div className="toast-body text-center text-danger fw-bold">
                                {massage.text}
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
                                <h2 style={{fontWeight: 400}} className={"text-center"}>Change password</h2>
                            </div>
                            <div className={"pt-4"}>
                                <label className={"form-label fs-6 user-select-none"} style={{fontWeight: 400}}>new
                                    password</label>
                                <div className={"position-relative d-flex justify-content-end align-items-center"}
                                     style={{cursor: "pointer"}}>
                                    <input onKeyPress={() => setInvalid({...isInvalid, newPassword: false})}
                                           value={newPassword}
                                           onChange={(event) => {
                                               setNewPassword(event.target.value)
                                               setMassage({...massage, condition: false})
                                           }}
                                           autoComplete={"off"} type={passwordShowed.newPassword ? "text" : "password"}
                                           id={"newPassword"}
                                           className={`form-control pe-4 ${isInvalid.newPassword ? "is-invalid  " : ""}`}
                                           name={"password"}/>

                                    {passwordShowed.newPassword === false && isInvalid.newPassword === false ?
                                        <BiShow className={"position-absolute me-2"}
                                                onClick={(event) => setPasswordShow({
                                                    ...passwordShowed,
                                                    newPassword: true
                                                })}/> : isInvalid.newPassword === false ?
                                            <BiHide className={"position-absolute me-2"}
                                                    onClick={(event) => setPasswordShow({
                                                        ...passwordShowed,
                                                        newPassword: false
                                                    })}/> : ""}
                                </div>
                            </div>
                            <div className={"pt-4"}>
                                <label className={"form-label user-select-none fs-6"} style={{fontWeight: 400}}>confirmation
                                    password</label>
                                <div className={"position-relative d-flex justify-content-end align-items-center"}
                                     style={{cursor: "pointer"}}>
                                    <input onKeyPress={() => setInvalid({...isInvalid, ConfirmPassword: false})}
                                           value={confirmPassword}
                                           onChange={(event) => {
                                               setConfirmPassword(event.target.value)
                                               setMassage({...massage, condition: false})
                                           }}
                                           autoComplete={"off"}
                                           type={passwordShowed.passwordConfirmation ? "text" : "password"}
                                           id={"passwordConfirmation"}
                                           className={`form-control pe-4 ${isInvalid.ConfirmPassword ? "is-invalid  " : ""}`}
                                           name={"password"}/>

                                    {passwordShowed.passwordConfirmation === false && isInvalid.ConfirmPassword === false ?
                                        <BiShow className={"position-absolute me-2"} onClick={(event) => {
                                            setPasswordShow({...passwordShowed, passwordConfirmation: true})
                                        }}/> : isInvalid.ConfirmPassword === false ?
                                            <BiHide className={"position-absolute me-2"}
                                                    onClick={(event) => {
                                                        setPasswordShow({
                                                            ...passwordShowed,
                                                            passwordConfirmation: false
                                                        })
                                                    }}/> : ""}
                                </div>
                            </div>
                            <div className={"pt-5"}>
                                <input type={"submit"} value={"change"}
                                       className={"form-control fs-6 shadow-none submit"}
                                       style={{fontWeight: 500, transition: "all ease-in 500ms"}}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>);
}