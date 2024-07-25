import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"

function GuestLayout(){

    const {token} = useStateContext()

    if(token){
        return <Navigate to="/" />
    }

    return (
        <div>
            <div>
                Guest
            </div>
            <Outlet />
        </div>
    )
}

export default GuestLayout