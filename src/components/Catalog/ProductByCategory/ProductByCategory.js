import { useEffect, useState } from "react";
import axios from 'axios';
import "./OneProduct.css";
import { useNavigate, useParams } from "react-router-dom";

function ProductsByCategory() {
    const id = useParams().id;
    const navigator = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/product/category/${id}`)
            .then(res => {
                console.log(res.data);
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
    }, [id]);
    return (
        <div>
            <div className="row">
                <div className="col-2">
                    <div id="list-example" className="list-group">
                        {
                            categories.map((elem, index) => {
                                return (
                                    <a key={index} className={(elem.id == id) ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} onClick={() => { navigator(`/products/category/${elem.id}`); }}>{elem.name}</a>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-10">
                    {
                        products.map((elem, index) => {
                            return (
                                <div className="ProductCard" key={index}>
                                    <br />
                                    <img src={elem.img} alt={elem.name} width="150" height="150" />
                                    <h4><b>{elem.name}</b></h4>
                                    <span style={{ color: "green" }}>{elem.price}$</span>
                                    <p><b>{categories.find(c => c.id === elem.category_id)?.name}</b></p>
                                    <p>{elem.description}</p>
                                    <button type="button" className="btn btn-primary" onClick={() => { navigator(`/basket/${elem.id}`) }}>Add to Basket</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
}

export default ProductsByCategory;