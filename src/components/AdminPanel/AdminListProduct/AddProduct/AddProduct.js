import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [name, SetName] = useState("");
    const [description, SetDescription] = useState("");
    const [price, SetPrice] = useState(0);
    const [img, SetImg] = useState("");
    const [category_id, setCategoryId] = useState(0);
    const [categories, SetCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/category')
            .then(res => {
                SetCategories(res.data);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }, []);

    const My_submit = () => {
        var data = {
            name: name,
            description: description,
            price: price,
            img: img,
            category_id: category_id
        }
        axios.post("http://localhost:8080/api/product", data)
            .then(response => {
                navigate('/admin/product');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Add new Product</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="name" onChange={(e) => SetName(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" onChange={(e) => SetDescription(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" onChange={(e) => SetPrice(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="text" className="form-control" id="img" onChange={(e) => SetImg(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" onChange={(e) => setCategoryId(e.target.value)} style={{ width: 450 }}>
                        <option defaultValue={0}>Select category</option>
                        {
                            categories.map((element, index) => {
                                return (
                                    <option key={index} value={element.id}>{element.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button type="button" onClick={My_submit} className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default AddProduct;