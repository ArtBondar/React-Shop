import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminListProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [flag, SetFlag] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8080/api/product')
            .then(res => {
                setProducts(res.data);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
        axios.get('http://localhost:8080/api/category')
            .then(res => {
                setCategories(res.data);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }, [products.length, flag]);
    const Delete = (id) => {
        axios.delete(`http://localhost:8080/api/product/${id}`)
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
            <button type="button" className="btn btn-success" onClick={() => { navigate('/admin/product/add') }}>Add new Product</button>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{elem.id}</th>
                                    <td>{elem?.name}</td>
                                    <td>{elem?.description}</td>
                                    <td>{elem?.price}</td>
                                    <td><img src={elem.img} width="50px" /></td>
                                    <td>{categories.find(c => c.id === elem?.category_id)?.name}</td>
                                    <td><button type="button" className="btn btn-primary" onClick={() => { navigate(`/admin/product/edit/${elem.id}`) }}>Edit</button></td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => { Delete(elem?.id) }}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AdminListProduct;