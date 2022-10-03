import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Header from "./Header";
import Cart from "./Cart";
import PgFOF from "./PgFOF";
import Signup from "./Signup";
import Banner from "./Banner";
import UserProfile from "./UserProfile";
import Sellcar from "./Sellcar";
import Allcarspage from "./ProductsComponents/Allcarspage";
import Carscontainer from "./ProductsComponents/Carscontainer";
import SpecificCarpage from "./ProductsComponents/SpecificCarpage";

function App() {
  return (
    <Router>
      <Routes >
        <Route
          path="sellcar"
          element={
            <>
              <Header />
              <Sellcar />
            </>
          }
        />
        <Route
          path="login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="home"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="cartdata"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
        <Route path="header" element={<Header />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="userprofile"
          element={
            <>
              <Header />
              <UserProfile />
            </>
          }
        />
        <Route path="car-brands/Hyundai" element={<><Header /><Allcarspage type={'Hyundai'} /></>} />
        <Route path="car-brands/Kia" element={<><Header /><Allcarspage type={'Kia'} /></>} />
        <Route path="car-brands/Tata" element={<><Header /><Allcarspage type={'Tata'} /></>} />
        <Route path="car-brands/Maruti" element={<><Header /><Allcarspage type={'Maruti'} /></>} />
        <Route path="/car/:brand/:id" element={<><Header /><SpecificCarpage /></>}/>

        <Route
          path="*"
          element={
            <>
              <Header />
              <PgFOF />
            </>
          }
        />
      </Routes  >
    </Router>
  );
}

export default App;
