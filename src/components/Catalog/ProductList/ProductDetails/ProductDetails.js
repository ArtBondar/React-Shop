import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import './ProductDetails.css';

function ProductDetails() {
    const id = useParams().id;
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    const [text, setText] = useState("");
    const [mark, setMark] = useState(1);
    const [flag, setFlag] = useState(false);
    const [email, setEmail] = useState("");

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
        axios.get(`http://localhost:8080/api/review/product/${id}`)
            .then(res => {
                setReviews(res.data.reverse());
            })
            .catch(e => {
                console.log(e);
                return null;
            })
        axios.get(`http://localhost:8080/api/user`)
            .then(res => {
                setUsers(res.data);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
        axios.get('http://localhost:8080/api/user/info', { headers: { "Authorization": `Bearer ${cookies.token}` } })
            .then(res => {
                setEmail(res.data.email);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }, [flag]);

    const My_submit = () => {
        var data = {
            product_id: parseInt(id),
            mark: parseInt(mark),
            text: text
        };
        console.log(data);
        if (cookies.token !== '0') {
            axios.post('http://localhost:8080/api/review/user', data, { headers: { "Authorization": `Bearer ${cookies.token}` } })
                .then(res => {
                    setFlag(prev => !prev);
                })
                .catch(e => {
                    console.log(e);
                    return null;
                })
        }
    }

    const DeleteSubmit = (id) => {
        axios.delete(`http://localhost:8080/api/review/${id}`)
            .then(res => {
                setFlag(prev => !prev);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }
    return (
        <div>
            <div>
                <img src={product.img} alt={product.name} width="250" height="250" style={{ border: "solid 2px" }} />
                <h4><b>{product.name}</b></h4>
                <p><b>{categories.find(c => c.id === product.category_id)?.name}</b></p>
                <p style={{ color: "green", fontSize: "20px" }}>{product.price}$</p>
                <p>{'🌟'.repeat(Math.ceil(reviews.reduce((a, b) => a + b.mark, 0) / reviews.length))}{'⭐'.repeat(5 - Math.ceil(reviews.reduce((a, b) => a + b.mark, 0) / reviews.length))}</p>
                <p>{product.description}</p>
                {(cookies.token !== '0') ? <p><button type="button" className="btn btn-primary" onClick={() => { navigator(`/basket/${product.id}`) }}>Add to Basket</button></p> : null}
                <p><button type="button" className="btn btn-primary" onClick={() => { navigator(-1) }}>Go back</button></p>
                <br />
                <h3>Reviews</h3>
                <br />
                <form style={{ border: "1px solid", width: "500px", textAlign: "center", height: "230px" }}>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label" style={{fontSize: "20px"}}>Review Text</label>
                        <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} id="text" style={{ width: 450, marginLeft: 25 }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mark" className="form-label">{'🌟'.repeat(mark)}{'⭐'.repeat(5 - mark)}</label>
                        <br />
                        <input type="range" className="form-range" value={mark} onChange={(e) => setMark(e.target.value)} min="1" max="5" style={{ width: 450 }} />
                    </div>

                    <button type="button" onClick={My_submit} className="btn btn-primary">Send</button>
                </form>
                {
                    reviews.map((elem, index) => {
                        return (
                            <div key={index}>
                                <br />
                                <div style={{ border: "1px solid", width: "500px" }} key={index}>
                                    <div style={{ margin: "20px" }}>
                                        {(users.find(u => elem.user_id === u.id).email === email) ? <span onClick={() => DeleteSubmit(elem.id)} className="close-btn">&times;</span> : null}
                                        <p><b>{users.find(c => c.id === elem.user_id)?.email}</b> {new Date(Date.parse(elem.createdAt)).toLocaleString()}</p>
                                        <span>{'🌟'.repeat(elem.mark)}{'⭐'.repeat(5 - elem.mark)}</span>
                                        <h6>{elem.text}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div >
    );
}

export default ProductDetails;