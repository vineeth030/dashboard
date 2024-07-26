import { Navigate, Outlet } from "react-router-dom"
import { useContext, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios-client"

function DefaultLayout(){

    const {user, token, setUser, setToken} = useStateContext()

    if(!token){
        return <Navigate to="/login" />
    }

    const onLogout = (e) => { 
        e.preventDefault() 

        axiosClient.get('/logout').then(() => {
            setUser(null)
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data)
        })
    }, [])

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name} <a href="#" className="btn btn-primary" onClick={onLogout}> Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DefaultLayout