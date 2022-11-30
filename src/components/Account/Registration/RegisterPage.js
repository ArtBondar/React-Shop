import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, SetEmail] = useState(0);
    const [password, SetPassword] = useState(0);
    const [password1, SetPassword1] = useState(0);
    const navigator = useNavigate();
    const Valid = () => {
        return password === password1;
    }

    const My_submit = () => {
        if (!Valid) return;
        var data = {
            email: email,
            password: password
        };
        axios.post("http://localhost:8080/api/user/register", data)
            .then(res => {
                navigator('/');
            })
            .catch(e => {
                if (e.response.data.email != undefined)
                    navigator('/');
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Registretion</h1>
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
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Repeat password</label>
                    <input type="password" onChange={(e) => SetPassword1(e.target.value)} className="form-control" id="name" style={{ width: 450 }} />
                </div>
                <button type="button" onClick={My_submit} className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;