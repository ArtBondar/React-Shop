import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const AddToBasket = () => {
    const id = useParams().id;
    const [cookies] = useCookies(['token']);
    const [count, SetCount] = useState(1);
    const navigate = useNavigate();
    const [product, SetProduct] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/product/${id}`)
            .then(res => {
                SetProduct(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [id]);

    const My_submit = () => {
        var data = {
            product_id: product.id,
            count: count,
        };
        axios.post('http://localhost:8080/api/basket/product', data, { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(res => {
                navigate('/baskets');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            <h1>Add to basket</h1>
            <br />
            <form>
                <div className="mb-3">
                    <img src={product?.img} alt={product?.name} width="250" height="250" />
                </div>

                <div className="mb-3">
                    <h3>{product?.name}</h3>
                </div>

                <div className="mb-3">
                    <span style={{ color: "green" }}>{product?.price}$</span>
                </div>

                <div className="mb-3">
                    <h5>{product?.description}</h5>
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Count</label>
                    <input type="number" value={count} onChange={(e) => SetCount(e.target.value)} className="form-control" id="name" style={{ width: 450 }} />
                </div>

                <div className="mb-3">
                    <h5>Current price: <span style={{ color: "green" }}>{(product?.price * count).toFixed(2)}$</span></h5>
                </div>

                <button type="button" onClick={My_submit} className="btn btn-primary">Add to basket</button>
            </form>
        </div>
    );
}

export default AddToBasket;