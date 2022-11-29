import { Route, Routes } from 'react-router-dom';
import './App.css';
import InfoPage from './components/InfoPage/InfoPage';
import HomeLayout from './components/Layout/HomeLayout/HomeLayout';
import ErrorPage from './components/Layout/ErrorPage/ErrorPage';
// Catalog
import Products from './components/Catalog/ProductList/ProductList';
import ProductsByCategory from './components/Catalog/ProductByCategory/ProductByCategory';
// Account
import LoginPage from './components/Account/Login/Login';
import RegisterPage from './components/Account/Registration/RegisterPage';
// user [Admin]
import AdminListUser from './components/AdminPanel/AdminListUser/AdminListUser';
import EditUser from './components/AdminPanel/AdminListUser/EditUser/EditUser';
import AddUser from './components/AdminPanel/AdminListUser/AddUser/AddUser';
// product [Admin]
import AdminListProduct from './components/AdminPanel/AdminListProduct/AdminListProduct';
import EditProduct from './components/AdminPanel/AdminListProduct/EditProduct/EditProduct';
import AddProduct from './components/AdminPanel/AdminListProduct/AddProduct/AddProduct';
// category [Admin]
import AdminListCategory from './components/AdminPanel/AdminListCategory/AdminListCategory';
import EditCategory from './components/AdminPanel/AdminListCategory/EditCategory/EditCategory';
import AddCategory from './components/AdminPanel/AdminListCategory/AddCategory/AddCategory';
// basket [Admin]
import AdminListBasket from './components/AdminPanel/AdminListBasket/AdminListBasket';
import EditBasket from './components/AdminPanel/AdminListBasket/EditBasket/EditBasket';
import AddBasket from './components/AdminPanel/AdminListBasket/AddBasket/AddBasket';
import AccountBasket from './components/Account/AccountBasket/AccountBasket';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Products />} />
        {//Admin Panel (Category)
        }
        <Route path="admin/category" element={<AdminListCategory />} />
        <Route path="admin/category/add" element={<AddCategory />} />
        <Route path="admin/category/edit/:id" element={<EditCategory />} />
        {//Admin Panel (User)
        }
        <Route path="admin/user" element={<AdminListUser />} />
        <Route path="admin/user/edit/:id" element={<EditUser />} />
        <Route path="admin/user/add" element={<AddUser />} />
        {//Admin Panel (Product)
        }
        <Route path="admin/product" element={<AdminListProduct />} />
        <Route path="admin/product/edit/:id" element={<EditProduct />} />
        <Route path="admin/product/add" element={<AddProduct />} />
        {//Admin Panel (Basket)
        }
        <Route path="admin/basket" element={<AdminListBasket />} />
        <Route path="admin/basket/add" element={<AddBasket />} />
        <Route path="admin/basket/edit/:id" element={<EditBasket />} />
        {//Account
        }
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="baskets" element={<AccountBasket />} />
        {//Other
        }
        <Route path="contacts" element={<InfoPage />} />
        <Route path="products/category/:id" element={<ProductsByCategory />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;