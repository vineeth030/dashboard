import { Link } from "react-router-dom"
import { useRef } from "react"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"

function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const {setUser, setToken} = useStateContext()

    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload).then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        }).catch((error) => {
            const response = error.response
            if(response && response.status === 422) {
                console.log(response.data.errors)
            }
        })
    }

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Login To Your Account
                </h1>
                <form onSubmit={onSubmit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered? <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login 