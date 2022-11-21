import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminListBasket() {
    const navigate = useNavigate();
    const [baskets, setBaskets] = useState([]);
    const [users, SetUsers] = useState([]);
    const [products, SetProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/basket')
            .then(res => {
                setBaskets(res.data);
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

        axios.get('http://localhost:8080/api/user')
            .then(res => {
                SetUsers(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);
    const Delete = (id) => {
        axios.delete(`http://localhost:8080/api/basket/${id}`)
            .then(res => {
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }
    return (
        <div>
            <button type="button" className="btn btn-success" onClick={() => { navigate('/admin/basket/add') }}>Add new Basket</button>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User</th>
                        <th scope="col">Product</th>
                        <th scope="col">Count</th>
                        <th scope="col">Is Paid ?</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        baskets.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{elem.id}</th>
                                    <td>{users.find(u => u.id === elem.user_id).email}</td>
                                    <td>{products.find(p => p.id === elem.product_id).name}</td>
                                    <td>{elem.count}</td>
                                    <td>{(elem.is_paid) ? <div>Yes</div> : <div>No</div>}</td>
                                    <td><button type="button" className="btn btn-primary" onClick={() => { navigate(`/admin/basket/edit/${elem.id}`) }}>Edit</button></td>
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

export default AdminListBasket;