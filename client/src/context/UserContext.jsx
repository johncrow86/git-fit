import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [ authenticated, setAuthenticated ] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/users/login`, {
                    credentials: 'include' // needed for session cookies
                });
                const jsonData = await response.json();
                setAuthenticated(jsonData.authenticated);
            } catch (err) {
                console.error(err);
            }
        }
        checkAuth();
      }, []);

    async function logout() {
        try {
          await fetch(`http://localhost:5000/api/v1/users/logout`, {
            credentials: 'include' // needed for session cookies
          });
          setAuthenticated(false);
        } catch (err) {
          console.error(err);
        }
    };
    
    return (
        <UserContext.Provider value={{ authenticated, setAuthenticated, logout }}>
            {props.children}
        </UserContext.Provider>
    )
}
