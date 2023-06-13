import {Link, useNavigate, useParams} from "react-router-dom";
import {EmailConfigurationInput} from "../Components/emailConfigurationInput";
import {useEffect, useState} from "react";
import {useGlobalContextAPI} from "../context";
import axios from "axios";

export function EmailConfirmation() {
    const navigate = useNavigate();
    //the massage of error that sended from backend
    const [massage, setMassage] = useState({
        condition: false,
        text: 'There is something wrong with username or password or email'
    })
    const {base_url} = useGlobalContextAPI()
    //getting url params
    const params = useParams()
    //its the value of key
    const [emailInfo, setEmailInfo] = useState({
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
        six: null
    })
    //everyTime user enter a number this funcion runs
    //this function well send key to backend
    useEffect(() => {
        checkKey()
    }, [emailInfo.one, emailInfo.two, emailInfo.three, emailInfo.four, emailInfo.five, emailInfo.six])
    //initial request to backend for creating code
    useEffect(() => {
        sendCode(true, false)
    }, [])

    async function sendCode(isResend, code) {
        try {
            let verifyInfo = {
                username: params.username,
                email: params.email,
                new_code: isResend,
                code: isResend ? false : code
            }
            let forgetPasswordInfo = {
                email: params.email,
                new_code: isResend,
                new_password: false,
                code: isResend ? false : code
            }

            let res = await axios.post(`${base_url}/user/${params.page}/`, params.page !== 'forget-password' ? verifyInfo : forgetPasswordInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            //in this part we check if status were 200 and it wasent a resend request we send the use to the sign in page
            if (isResend !== true && (res.status === 201 || res.status === 200)) {
                if (params.page === 'forget-password') {
                    navigate(`/changepassword/${params.email}`)
                } else {
                    navigate('/login')
                }
            }
        } catch (e) {
            if (e.response.status === 403 || e.response.status === 401) {
                setMassage({condition: true, text: 'code is not valid'})
            }
        }
    }

    async function checkKey(callByBtn = false) {
        if (validation(Object.values(emailInfo))) {
            let key = emailInfo.one + emailInfo.two + emailInfo.three + emailInfo.four + emailInfo.five + emailInfo.six
            sendCode(false, key)
        } else if (callByBtn) {
            setMassage({condition: true, text: "fill all of inputs"})
        }
    }

    //this function checks if all of fields are filled
    function validation(array) {
        let isValid = null
        for (let item of array) {
            if (!item) {
                isValid = false
            }
        }
        return isValid === null ? true : isValid
    }

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
                <div className={"container pb-5"}>
                    <div className={"row justify-content-center"}>
                        <form onSubmit={event => {
                            event.preventDefault()
                            checkKey(true)
                        }} className={"col-lg-6 col-8 p-4 rounded-2 bg-white"}>
                            <div>
                                <h5 style={{fontWeight: 400}} className={"text-center"}>enter the code that we have send
                                    to your email</h5>
                            </div>
                            <div className={"row rounded-2 mt-5"}>
                                <EmailConfigurationInput setKeyFunc={(number) => {
                                    setEmailInfo({...emailInfo, one: number})
                                    setMassage({...massage, condition: false})
                                }} inputName={"one"}/>
                                <EmailConfigurationInput setKeyFunc={(number) => {
                                    setEmailInfo({...emailInfo, two: number})
                                    setMassage({...massage, condition: false})
                                }} inputName={"two"}/>
                                <EmailConfigurationInput setKeyFunc={(number) => {
                                    setEmailInfo({...emailInfo, three: number})
                                    setMassage({...massage, condition: false})
                                }} inputName={"three"}/>
                                <EmailConfigurationInput setKeyFunc={(number) => {
                                    setEmailInfo({...emailInfo, four: number})
                                    setMassage({...massage, condition: false})
                                }} inputName={"four"}/>
                                <EmailConfigurationInput setKeyFunc={(number) => {
                                    setEmailInfo({...emailInfo, five: number})
                                    setMassage({...massage, condition: false})
                                }} inputName={"five"}/>
                                <EmailConfigurationInput setKeyFunc={(number) => {
                                    setEmailInfo({...emailInfo, six: number})
                                    setMassage({...massage, condition: false})
                                }} inputName={"six"}/>
                            </div>
                            <div className={"pt-5"}>
                                <p className={'text-center pt-4'}>Do you want a new code? <span
                                    style={{color: "rgb(25, 191, 211)", cursor: 'pointer'}}
                                    className={""}
                                    onClick={async () => sendCode(true, false)}>resend </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}