import { Link } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Register(){

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const {setUser, setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault()
        
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        console.log(payload)

        axiosClient.post('/register', payload).then((response) => {
            setUser(response.data.user.name)    
            setToken(response.data.token)
        }).catch((error) => {
            const response =error.response
            if(response && response.status == 422){
                console.log(response.data.errors)
            }
        })

    }

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Create A New Account
                </h1>
                <form onSubmit={onSubmit}>
                    <input ref={nameRef} type="name" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to= '/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register