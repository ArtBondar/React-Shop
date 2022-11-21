import { useEffect, useState } from "react";
import axios from 'axios';
import OneProduct from "./OneProduct/OneProduct";

function ProductsPage() {
    const img = "https://play-lh.googleusercontent.com/dtuj2URAXabsP93t4krjvI9a0Dm7dDxAc_PL0DbShQtU3-Vnv7st06CKRyhHiVgS-ME=w240-h480";
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/product')
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch(e => {
                console.log(e);
                return null;
            })
    }, []);
    return (
        <div>
            {
                products.map((elem, index) => {
                    return (
                        <OneProduct
                            key={index}
                            ProdName={elem.name}
                            ProdPrice={elem.price}
                            ProdImg={elem.img}
                            ProdIdCategory={elem.id_category} ></OneProduct>
                    )
                })
            }
        </div>
    );
}

export default ProductsPage;