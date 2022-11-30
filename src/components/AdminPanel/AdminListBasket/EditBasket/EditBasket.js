import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBasket = () => {
    const id = useParams().id;
    const [user_id, SetUser_id] = useState(0);
    const [product_id, SetProduct_id] = useState(0);
    const [count, SetCount] = useState(0);
    const [is_paid, SetIs_paid] = useState(false);
    const navigate = useNavigate();
    const [users, SetUsers] = useState([]);
    const [products, SetProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/basket/${id}`)
            .then(res => {
                SetUser_id(res.data.user_id);
                SetProduct_id(res.data.product_id);
                SetCount(res.data.count);
                SetIs_paid(res.data.is_paid);
            })
            .catch(e => {
                console.log(e);
            });
        axios.get('http://localhost:8080/api/user')
            .then(res => {
                SetUsers(res.data);
            })
            .catch(e => {
                console.log(e);
            });
        axios.get('http://localhost:8080/api/product')
            .then(res => {
                SetProducts(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const My_submit = () => {
        var data = {
            user_id: user_id,
            product_id: product_id,
            count: count,
            is_paid: is_paid
        };
        axios.put(`http://localhost:8080/api/basket/${id}`, data)
            .then(res => {
                navigate('/admin/basket');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Edit Basket</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label className="form-label">User</label>
                    <select className="form-select" value={user_id} onChange={(e) => SetUser_id(e.target.value)} style={{ width: 450 }}>
                        {
                            users.map((element, index) => {
                                return (
                                    <option key={index} value={element.id}>{element.email}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Product</label>
                    <select className="form-select" value={product_id} onChange={(e) => SetProduct_id(e.target.value)} style={{ width: 450 }}>
                        {
                            products.map((element, index) => {
                                return (
                                    <option key={index} value={element.id}>{element.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Count</label>
                    <input type="number" value={count} onChange={(e) => SetCount(e.target.value)} className="form-control" id="name" style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={is_paid} onChange={(e) => SetIs_paid(e.target.checked)} id="is_paid" />
                        <label className="form-check-label">
                            Is paid ?
                        </label>
                    </div>
                </div>

                <button type="button" onClick={My_submit} className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditBasket;