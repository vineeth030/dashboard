import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { Link } from "react-router-dom"

function Users() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUsers()
    }, [])

    const handleOnClickDelete = (user, e) => {
        e.preventDefault()

        if (!window.confirm("Are you sure?")) {
            return
        }

        axiosClient.delete(`/users/${user.id}`)
        .then(() => {
            getUsers()
        })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
        .then(({data}) => {
            console.log('data: ', data.data)
            setLoading(false)
            setUsers(data.data)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to="/users/new"> Add new user</Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    { loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    { !loading && (
                        <tbody>
                            { users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className="btn-edit" to={`/users/${user.id}`}>Edit</Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={(e) => handleOnClickDelete(user, e)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                    
                </table>
            </div>


            
        </div>
    )
}

export default Users