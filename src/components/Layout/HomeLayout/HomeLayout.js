import * as React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../NavBar/NavBar';

function HomeLayout () {
    return (
        <div>
            <Navbar/>
            <br />
            <br />
            <div className="container mt-3">
                <Outlet/>
            </div>
        </div>
    )
}

export default HomeLayout;