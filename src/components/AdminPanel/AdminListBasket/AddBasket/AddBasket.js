import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBasket = () => {
    const [user_id, SetUser_id] = useState(0);
    const [product_id, SetProduct_id] = useState(0);
    const [count, SetCount] = useState(0);
    const [is_paid, SetIs_paid] = useState(false);
    const navigate = useNavigate();
    const [users, SetUsers] = useState([]);
    const [products, SetProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/product')
            .then(res => {
                SetProducts(res.data);
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
    }, []);

    const My_submit = () => {
        var data = {
            user_id: user_id,
            product_id: product_id,
            count: count,
            is_paid: is_paid
        };
        axios.post("http://localhost:8080/api/basket", data)
            .then(res => {
                navigate('/admin/basket');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Add new Basket</h1>
            <br />
            <form>
                <div className="mb-3">
                    <label className="form-label">User</label>
                    <select className="form-select" onChange={(e) => SetUser_id(e.target.value)} style={{ width: 450 }}>
                        <option defaultValue={0}>Select user email</option>
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
                    <select className="form-select" onChange={(e) => SetProduct_id(e.target.value)} style={{ width: 450 }}>
                        <option defaultValue={0}>Select product</option>
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
                    <input type="number" onChange={(e) => SetCount(e.target.value)} className="form-control" id="name" style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={is_paid} onChange={(e) => SetIs_paid(e.target.value)} id="is_paid" />
                        <label className="form-check-label">
                            Is paid ?
                        </label>
                    </div>
                </div>


                <button type="button" onClick={My_submit} className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default AddBasket;