import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

function ProductDetails() {
    const id = useParams().id;
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigator = useNavigate();
    const [cookies] = useCookies(['token']);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/product/${id}`)
            .then(res => {
                setProduct(res.data);
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
    }, []);
    return (
        <div>
            <div>
                <img src={product.img} alt={product.name} width="250" height="250" style={{ border: "solid 2px" }} />
                <h4><b>{product.name}</b></h4>
                <p><b>{categories.find(c => c.id === product.category_id)?.name}</b></p>
                <p style={{ color: "green" }}>{product.price}$</p>
                <p>{product.description}</p>
                {(cookies.token !== '0') ? <p><button type="button" className="btn btn-primary" onClick={() => { navigator(`/basket/${product.id}`) }}>Add to Basket</button></p> : null}
                <p><button type="button" className="btn btn-primary" onClick={() => { navigator(-1) }}>Go back</button></p>
            </div>

        </div >
    );
}

export default ProductDetails;