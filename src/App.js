import TeacherLayout from "./components/teacher/TeacherLayout";
import Cart from "./components/teacher/others/Cart/Cart";
import FilterSearch from "./components/teacher/others/FilterSearch/FilterSearch";
import Index from "./components/teacher/others/Index/Index";
import ProductDetails from "./components/teacher/others/Product-Details/ProductDetails";
import Favorites from "./components/teacher/others/Favorites/Favorites";
import AccountSettings from "./components/teacher/others/AccountSettings/AccountSettings";
import Login from "./components/login/Login";
import DistributorLayout from "./components/distributor/DistributorLayout";
import DistributorIndex from "./components/distributor/DistributorIndex";
import DistributorProfile from "./components/distributor/DistributorProfile";
import Order from "./components/distributor/Order";
import Products from "./components/distributor/Products";
import Publishers from "./components/distributor/Publishers";
import Performance from "./components/distributor/Performance";
import { Route, Switch } from "react-router-dom";
import Authentication from "./logics/Authentication";
import PrivateRoute from "./PrivateRoute";
import Error from "./components/Error";
import OrderTracking from "./components/teacher/others/OrderTrack/OrderTracking";
import Orders from "./components/teacher/others/Orders/Orders";
import DistributorTeachers from "./components/distributor/DistributorTeachers";




function App() {


  return (
    <div>
      <Switch>
        <Route exact path={["/", "/login"]}>
          <Login />
        </Route>
        <PrivateRoute typeID={1} exact path="/distributor/">
          <DistributorLayout>
            <DistributorIndex />
          </DistributorLayout>
        </PrivateRoute>
        <PrivateRoute typeID={1} exact path="/distributor/performance">
          <DistributorLayout>
            <Performance />
          </DistributorLayout>
        </PrivateRoute>
        <PrivateRoute typeID={1} exact path="/distributor/orders">
          <DistributorLayout>
            <Order />
          </DistributorLayout>
        </PrivateRoute>
        <PrivateRoute typeID={1} exact path="/distributor/publishers">
          <DistributorLayout>
            <Publishers />
          </DistributorLayout>
        </PrivateRoute>
        <PrivateRoute typeID={1} exact path="/distributor/products">
          <DistributorLayout>
            <Products />
          </DistributorLayout>
        </PrivateRoute>
        <PrivateRoute typeID={1} exact path="/distributor/accountSettings">
          <DistributorLayout>
            <DistributorProfile />
          </DistributorLayout>
        </PrivateRoute>
        <PrivateRoute typeID={1} exact path="/distributor/teachers">
          <DistributorLayout>
            <DistributorTeachers />
          </DistributorLayout>
        </PrivateRoute>
        <PrivateRoute typeID={0} exact path="/teacher">
          <TeacherLayout>
            <Index />
          </TeacherLayout>
        </PrivateRoute>
        <PrivateRoute typeID={0} exact path="/teacher/accountSettings">
          <TeacherLayout>
            <AccountSettings />
          </TeacherLayout>
        </PrivateRoute>
        <PrivateRoute typeID={0} exact path="/teacher/cart">
          <TeacherLayout>
            <Cart />
          </TeacherLayout>
        </PrivateRoute>
        <PrivateRoute typeID={0} exact path="/teacher/filterSearch/:category">
          <TeacherLayout>
            <FilterSearch />
          </TeacherLayout>
        </PrivateRoute>
        <PrivateRoute typeID={0} exact path="/teacher/productDetails/:productId">
          <TeacherLayout>
            <ProductDetails />
          </TeacherLayout>
        </PrivateRoute>
        <PrivateRoute typeID={0} exact path="/teacher/favorites">
          <TeacherLayout>
            <Favorites />
          </TeacherLayout>
        </PrivateRoute>
        <PrivateRoute typeID={0} exact path="/teacher/orders">
          <TeacherLayout>
            <Orders />
          </TeacherLayout>
        </PrivateRoute>
        <PrivateRoute typeID={0} exact path="/teacher/order-details/:orderId">
          <TeacherLayout>
            <OrderTracking />
          </TeacherLayout>
        </PrivateRoute>

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
