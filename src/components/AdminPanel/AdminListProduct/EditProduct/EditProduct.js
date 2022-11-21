import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const id = useParams().id;
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
        //
        axios.get(`http://localhost:8080/api/product/${id}`)
            .then(res => {
                SetName(res.data.name);
                SetDescription(res.data.description);
                SetPrice(res.data.price);
                SetImg(res.data.img);
                setCategoryId(res.data.category_id);
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
        };
        axios.put(`http://localhost:8080/api/product/${id}`, data)
            .then(res => {
                navigate('/admin/product');
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }

    return (
        <div>
            <h1>Edit Product</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => SetName(e.target.value)} style={{ width: 450 }} />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={description} onChange={(e) => SetDescription(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={(e) => SetPrice(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="text" className="form-control" id="img" value={img} onChange={(e) => SetImg(e.target.value)} style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={category_id} onChange={(e) => setCategoryId(e.target.value)} style={{ width: 450 }}>
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

                <button type="button" onClick={My_submit} className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditProduct;