import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [email, SetEmail] = useState("");
    const [is_admin, SetIsAdmin] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/${id}`)
            .then(res => {
                SetEmail(res.data.email);
                SetIsAdmin(res.data.is_admin);
                setBalance(res.data.balance);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const My_submit = () => {
        var data = {
            email: email,
            is_admin: is_admin,
            balance: balance
        };
        axios.put(`http://localhost:8080/api/user/${id}`, data)
            .then(res => {
                navigate('/admin/user');
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }

    return (
        <div>
            <h1>Edit User</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label className="form-label">User Email</label>
                    <input type="text" className="form-control" id="email" value={email} onChange={(e) => SetEmail(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={is_admin} onChange={(e) => SetIsAdmin(e.target.checked)} id="admin" />
                        <label className="form-check-label">
                            Is Admin ?
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Balance</label>
                    <input type="number" className="form-control" id="balance" value={balance} onChange={(e) => setBalance(e.target.value)} style={{ width: 450 }} />
                </div>

                <button type="button" onClick={My_submit} className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditUser;