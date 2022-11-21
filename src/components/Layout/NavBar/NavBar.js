import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
    const [cookies] = useCookies(['token']);
    const [email, setEmail] = useState('');
    const [balance, setBalance] = useState(-1);

    useEffect(() => {
        if (cookies.token != null) {
            console.log(cookies);
            axios.get('http://localhost:8080/api/user/info', cookies)
                .then(res => {
                    console.log(res.data);
                    setEmail(res.data.email);
                    setBalance(res.data.balance);
                })
                .catch(e => {
                    console.log(e);
                    return null;
                })
        }
    }, []);
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        My Shop
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/"
                                >
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/contacts"
                                >
                                    Contacts
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/admin/category"
                                >
                                    Categories[Admin]
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/admin/product"
                                >
                                    Products[Admin]
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/admin/user"
                                >
                                    Users[Admin]
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/admin/basket"
                                >
                                    Baskets[Admin]
                                </Link>
                            </li>
                            
                        </ul>


                        {
                            (!cookies)
                                ?
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <b>{email}</b>
                                    </li>
                                    <li className="nav-item">
                                        <b>Balance: {balance}</b>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Log In
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </ul>
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;