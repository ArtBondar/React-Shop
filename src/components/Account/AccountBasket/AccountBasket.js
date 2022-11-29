import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AccountBasket() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['token']);
    const [baskets, setBaskets] = useState([]);
    const [products, SetProducts] = useState([]);

    useEffect(() => {
        if (cookies.token !== '0') {
            var data = {
                token: cookies.token
            }
            axios.get('http://localhost:8080/api/user/baskets', { headers: { "Authorization": `Bearer ${data.token}` } })
                .then(res => {
                    setBaskets(res.data);
                    console.log(res.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

        axios.get('http://localhost:8080/api/product')
            .then(res => {
                SetProducts(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const Paid = (id) => {
        if (cookies.token !== '0') {
            var data = {
                token: cookies.token
            }
            axios.get(`http://localhost:8080/api/basket/paid/${id}`, { headers: { "Authorization": `Bearer ${data.token}` } })
                .then(res => {
                    window.location.reload();
                })
                .catch(e => {
                    console.log(e);
                    return null;
                })
        }
    }

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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Count</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        baskets.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{products.find(p => p.id === elem.product_id)?.name}</td>
                                    <td>{elem?.count}</td>
                                    <td>{(elem?.is_paid) ? <div>Is paid</div> : <button type="button" className="btn btn-primary" onClick={() => { Paid(elem.id) }}>Paid</button>}</td>
                                    <td>{(elem?.is_paid) ? null : <button type="button" className="btn btn-danger" onClick={() => { Delete(elem.id) }}>Remove</button>}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AccountBasket;