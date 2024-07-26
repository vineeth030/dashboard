import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../axios-client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const UserFrom = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        id:null,
        name:'',
        email:'',
        password:''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)

    if(id){
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(user.id){
            axiosClient.put(`/users/${user.id}`, user)
                .then(() =>{
                    navigate('/users')
                })
                .catch(err =>{
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
        else{
            axiosClient.post('/users', user)
                .then(() => {
                navigate('/users')
                })
                .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
                })
        }
    }

    return (
        <>  
            { user.id && (<h1> Edit User</h1>)}
            { !user.id && (<h2> Create User</h2>)}
            <div className="card animated fadeInDown">
                { loading && (
                    <div className="text-center">Loading...</div>
                )}
                { errors && (
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    )
                }
                { !loading && (
                    <form onSubmit={handleOnSubmit}>
                        <input value={user.name} onChange={e => setUser({...user, name: e.target.value})} type="text" placeholder="Name" />
                        <input value={user.email} onChange={e => setUser({...user, email: e.target.value})} type="text" placeholder="Email" />
                        <input value={user.password} onChange={e => setUser({...user, password: e.target.value})} type="text" placeholder="Password" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}

export default UserFrom