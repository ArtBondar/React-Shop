import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
    const [cookies, removeCookie] = useCookies(['token']);
    const [email, setEmail] = useState('');
    const [balance, setBalance,] = useState(0);
    const [is_admin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (cookies.token !== '0') {
            var data = {
                token: cookies.token
            }
            axios.get('http://localhost:8080/api/user/info', { headers: { "Authorization": `Bearer ${data.token}` } })
                .then(res => {
                    setEmail(res.data.email);
                    setBalance(res.data.balance);
                    setIsAdmin(res.data.is_admin);
                })
                .catch(e => {
                    console.log(e);
                    return null;
                })
        }
    }, []);

    const LogOut = () => {
        removeCookie('token', '0');
        window.location.reload();
    }

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
                            {
                                (!is_admin) ?
                                    <>

                                    </>
                                    :
                                    <>
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
                                    </>
                            }
                        </ul>
                        {
                            (cookies.token !== '0')
                                ?
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <div className="nav-link active"><b>{email}</b></div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link active">Balance: <b style={(balance > 0) ? { color: "green" } : { color: "red" }}>{balance}$</b></div>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-primary" onClick={LogOut}>Log out</button>
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