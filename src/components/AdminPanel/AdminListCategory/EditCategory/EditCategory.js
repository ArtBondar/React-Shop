import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
    const id = useParams().id;
    console.log(id);
    const navigate = useNavigate();
    const [name, SetName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/category/${id}`)
            .then(res => {
                SetName(res.data.name);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }, []);

    const My_submit = () => {
        var data = {
            name: name
        }
        axios.put(`http://localhost:8080/api/category/${id}`, data)
            .then(res => {
                console.log(res);
                navigate('/admin/category');
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }

    return (
        <div>
            <h1>Edit Category</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input type="text" onChange={(e) => SetName(e.target.value)} value={name} className="form-control" id="name" style={{ width: 450 }} />
                </div>
                <button type="button" onClick={My_submit} className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditCategory;