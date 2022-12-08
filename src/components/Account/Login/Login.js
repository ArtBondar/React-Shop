import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, SetEmail] = useState(0);
    const [password, SetPassword] = useState(0);
    const [cookies, setCookie] = useCookies(['token']);
    const navigator = useNavigate();
    const My_submit = () => {
        var data = {
            email: email,
            password: password
        };
        axios.post("http://localhost:8080/api/user/login", data)
            .then(response => {
                console.log(response.data);
                let expires = new Date()
                expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
                setCookie('token', response.data.token, { path: '/', expires })
                navigator('/');
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Email</label>
                    <input type="email" onChange={(e) => SetEmail(e.target.value)} className="form-control" id="name" style={{ width: 450 }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Password</label>
                    <input type="password" onChange={(e) => SetPassword(e.target.value)} className="form-control" id="name" style={{ width: 450 }} />
                </div>
                <button type="button" onClick={My_submit} className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;