import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [is_admin, SetIsAdmin] = useState(false);
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    const My_submit = () => {
        var data = {
            email: email,
            password: password,
            is_admin: is_admin,
            balance: balance
        }
        axios.post("http://localhost:8080/api/user", data)
            .then(response => {
                navigate('/admin/user');
            })
            .catch(e => {
                console.log(e);
            });

    }

    return (
        <div>
            <h1>Add new User</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label className="form-label">User Email</label>
                    <input type="text" className="form-control" id="email" onChange={(e) => SetEmail(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="text" className="form-control" id="password" onChange={(e) => SetPassword(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={(e) => SetIsAdmin(e.target.value)} id="admin" />
                        <label className="form-check-label">
                            Is Admin ?
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Balance</label>
                    <input type="number" className="form-control" id="balance" onChange={(e) => setBalance(e.target.value)} style={{ width: 450 }} />
                </div>

                <button type="button" onClick={My_submit} className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default AddUser;