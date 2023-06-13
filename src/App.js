import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {SharedLayout} from "./pages/SharedLayout";
import {NotFound} from "./pages/NotFound";
import {About} from "./pages/About";
import {AppProvider} from "./context";
import {Products} from "./pages/Products";
import {Product} from "./pages/product"
import {Login} from "./pages/Login";
import {Signin} from "./pages/Signin";
import {EmailConfirmation} from "./pages/EmailConfirmation";
import {ForgetPassword} from "./pages/ForgetPassword";
import {ChangePassword} from "./pages/changePassword";
import {Cart} from "./pages/cart";
import "./dist/css/App.css"
function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <Routes>
                    <Route path={"/"} element={<SharedLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path={"about"} element={<About/>}/>
                        <Route path={"cart"} element={<Cart/>}/>
                        <Route path={"products"} element={<Products/>}/>
                        <Route path={"signin"} element={<Signin/>}/>
                        <Route path={"forgetpassword"} element={<ForgetPassword/>}/>
                        <Route path={"changepassword/:email"} element={<ChangePassword/>}/>
                        <Route path={"emailconfirmation/:username/:email/:page"} element={<EmailConfirmation/>}/>
                        <Route path={"login"} element={<Login/>}/>
                        <Route path={"product/:productId"} element={<Product/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                    </Route>
                </Routes>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App
