import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
    loggedIn: false
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

                setStoreState({ 'loggedIn': true });
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <Context.Provider value={[storeState, setStoreState]}>{children}</Context.Provider>
    )
}

export default Store;