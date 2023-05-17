import React, { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
    const [ loginName, setLoginName ] = useState('');
    const [ loginPass, setLoginPass ] = useState('');
    const [ registerName, setRegisterName ] = useState('');
    const [ registerPass, setRegisterPass ] = useState('');
    const [ error, setError ] = useState('')
    const { authenticated, setAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect if authenticated
    useEffect(() => {
        if (authenticated) navigate('/');
    },[authenticated])

    async function handleLogin() {
        try {
            const body = {
                username: loginName,
                password: loginPass
            }
            const response = await fetch(`http://localhost:5000/api/v1/users/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include'
            });
            const jsonData = await response.json();
            if (!response.ok) setError(jsonData.error);
            else {
                const user = jsonData.data.users;
                setAuthenticated(true);
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function handleRegister() {
        try {
            const body = {
                username: registerName,
                password: registerPass
            }
            const response = await fetch(`http://localhost:5000/api/v1/users/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include'
            });
            const jsonData = await response.json();
            if (!response.ok) setError(jsonData.error);
            else {
                const user = jsonData.data.users;
                setAuthenticated(true);
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
        <div id="top-space" style={{ height: "200px" }}></div>
            <div className="bg-white text-center py-5" style={{ border: '3px solid black'}}>
            <form action="">
                <h1>Login</h1>
                <div className="form-group">
                    <label className="mr-2">Username: </label>
                    <input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} onClick={(e) => setError('')}></input>
                </div>
                <div className="form-group">
                    <label className="mr-2">Password: </label>
                    <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} onClick={(e) => setError('')}></input>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin} disabled={error}>Login</button>
                <h3 className="mt-5">Register</h3>
                <div className="form-group">
                    <label className="mr-2">Username: </label>
                    <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} onClick={(e) => setError('')}></input>
                </div>
                <div className="form-group">
                    <label className="mr-2">Password: </label>
                    <input type="password" value={registerPass} onChange={(e) => setRegisterPass(e.target.value)} onClick={(e) => setError('')}></input>
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleRegister} disabled={error}>Register</button>
                {error && <p className="text-danger">{error}</p>}
            </form>
        </div>
        </Fragment>
    )
}

export default LoginPage;
