import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import NavBar from "./components/navBar/NavBar.component";
import Home from "./pages/home/Home.page";
import Product from "./pages/product/Product.page";
import "react-toastify/dist/ReactToastify.css";
import Favorites from "./pages/favorites/Favorites.page";
import AboutUs from "./pages/aboutUs/AboutUs.page";
import PageMenu from "./pages/pageMenu/PageMenu.page";
import Footer from "./components/footer/Footer.component";
import Admin from "./pages/admin/Admin.page";
import AuthGuard from "./components/authGuard/AuthGuard.component";
import DashboardNavBar from "./pages/dashboard/Dashboard.page";
import AdminEditOrCreateProduct from "./components/adminEditOrCreateProduct/AdminEditOrCreateProduct.component";
import AdminAutoLogIn from "./components/adminAutoLogIn/AdminAutoLogIn.component";
import PageNotFount from "./pages/404/404.page";
import ContactUs from "./pages/contactUs/ContactUs.page";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.page";
import RecoveryPassword from "./pages/recoveryPassword/RecoveryPassword.page";
import CreateAdmin from "./pages/createAdmin/CreateAdmin.page";
function App() {
  return (
    <Fragment>
      <AdminAutoLogIn />
      <ToastContainer />
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/בית" element={<Home />} />
          <Route exact path="/מוצר/:id" element={<Product />} />
          <Route path="/מועדפים" element={<Favorites />} />
          <Route path="/מה-הקונספט" element={<AboutUs />} />
          <Route path="/תפריט" element={<PageMenu />} />
          <Route path="/צור-קשר" element={<ContactUs />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="recovery-password/:secret/:iv/:data"
            exact
            element={<RecoveryPassword />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <AuthGuard>
                <DashboardNavBar />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/dashboard/leads"
            element={
              <AuthGuard>
                <DashboardNavBar />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/dashboard/products"
            element={
              <AuthGuard>
                <DashboardNavBar />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/dashboard/messages"
            element={
              <AuthGuard>
                <DashboardNavBar />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AuthGuard>
                <AdminEditOrCreateProduct />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/add"
            element={
              <AuthGuard>
                <AdminEditOrCreateProduct />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <AuthGuard>
                <Product />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/dashboard/private-details"
            element={
              <AuthGuard>
                <DashboardNavBar />
              </AuthGuard>
            }
          />
          <Route path="/404" element={<PageNotFount />} />
          <Route path="*" element={<PageNotFount />} />
        </Routes>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
