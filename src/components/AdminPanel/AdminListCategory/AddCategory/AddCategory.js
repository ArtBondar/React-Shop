import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const [name, SetName] = useState("");
    const navigate = useNavigate();
    const My_submit = () => {
        var data = {
            name: name
        };
        axios.post("http://localhost:8080/api/category", data)
            .then(response => {
                console.log(response.data);
                navigate('/admin/category');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Add new Category</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input type="text" onChange={(e) => SetName(e.target.value)} className="form-control" id="name" style={{ width: 450 }} />
                </div>
                <button type="button" onClick={My_submit} className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default AddCategory;