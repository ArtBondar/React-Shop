import { useEffect, useState } from "react";
import axios from 'axios';
import "./OneProduct.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function ProductsPage() {
    const navigator = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cookies] = useCookies(['token']);
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
    }, [products.length]);
    return (
        <div>
            <div className="row">
                <div className="col-2">
                    <div id="list-example" className="list-group">
                        {
                            categories.map((elem, index) => {
                                return (
                                    <a key={index} className="list-group-item list-group-item-action" onClick={() => { navigator(`/products/category/${elem.id}`); }}>{elem.name}</a>
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
                                    {(cookies.token !== '0') ? <button type="button" className="btn btn-primary" onClick={() => { navigator(`/basket/${elem.id}`) }}>Add to Basket</button> : null}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div >
    );
}

export default ProductsPage;