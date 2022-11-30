import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminListUser() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [flag, SetFlag] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8080/api/user')
            .then(res => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }, [users.length, flag]);
    const Delete = (id) => {
        axios.delete(`http://localhost:8080/api/user/${id}`)
            .then(res => {
                SetFlag((prev) => !prev);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }
    return (
        <div>
            <button type="button" className="btn btn-success" onClick={() => {navigate('/admin/user/add')}}>Add new User</button>
            <br/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Is Admin ?</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{elem?.id}</th>
                                    <td>{elem?.email}</td>
                                    <td>{elem?.balance}</td>
                                    <td>{(elem?.is_admin) ? <div>Yes</div> : <div>No</div>}</td>
                                    <td><button type="button" className="btn btn-primary" onClick={() => { navigate(`/admin/user/edit/${elem.id}`) }}>Edit</button></td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => { Delete(elem.id) }}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AdminListUser;