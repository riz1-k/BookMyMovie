import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

require('dotenv').config();

const AuthContext = createContext();
const AuthProvider = props => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const getUserData = () => {
        const token = localStorage.getItem('token');

        console.log(token);
        const options = {
            headers: {
                'x-auth-token': token,
            },
        };
        axios
            .get(`${process.env.REACT_APP_API}`, options)
            .then(res => {
                setUser(res.data.user);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setUser(null);
                localStorage.removeItem('token');
            });
    };
    useEffect(() => {
        getUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, getUserData }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
