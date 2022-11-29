import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminListCategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/category')
            .then(res => {
                console.log(res.data);
                setCategories(res.data);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }, []);
    const Delete = (id) => {
        axios.delete(`http://localhost:8080/api/category/${id}`)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }
    return (
        <div>
            <button type="button" className="btn btn-success" onClick={() => {navigate('/admin/category/add')}}>Add new Category</button>
            <br/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{elem?.id}</th>
                                    <td>{elem?.name}</td>
                                    <td><button type="button" className="btn btn-primary" onClick={() => { navigate(`/admin/category/edit/${elem.id}`) }}>Edit</button></td>
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

export default AdminListCategory;