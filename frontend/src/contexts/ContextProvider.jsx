import { useState, useContext } from "react";
import { createContext } from "react";

const StateContext = createContext({
    user: null, 
    token: null,
    setToken: () => {},
    setUser: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        console.log('token 1: ', token)
        _setToken(token);
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}           
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext)