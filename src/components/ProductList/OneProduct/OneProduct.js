import "./OneProduct.css";

function OneProduct(props) {
    return (
        <div className="ProductCard">
            <br/>
            <img src={props.ProdImg} alt={props.ProdName} width="150" height="150"/>
            <h3><b>{props.ProdName}</b></h3>
            <span style={{color: "green"}}>{props.ProdPrice}$</span>
            <p><b>{props.ProdIdCategory}</b></p>
            <button type="button" className="btn btn-primary">Add to Basket</button>
        </div>
    );
}

export default OneProduct;