import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
    loggedIn: false,
    adminName: ''
};

export const Context = React.createContext();



const Store = ({ children }) => {
    const [storeState, setStoreState] = useState(initialState);
    let token = localStorage.getItem('token');
    if (!storeState.loggedIn && token) {
        let config = {
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': token
            }
        }

        axios.get("http://localhost:5000/users", config).then(res => {

                setStoreState({...initialState, loggedIn: true, adminName: res.data.name });
            })
            .catch(err => {
                console.error(`${err.response.status}: ${err.response.data.msg}`);
            });
    }
    return (
        <Context.Provider value={[storeState, setStoreState]}>{children}</Context.Provider>
    )
}

export default Store;