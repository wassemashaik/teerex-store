import { Link } from "react-router-dom";
import "./index.css";
import Header from "../Header";

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="welcome">Welcome to Teerex Store</h1>
      <Link to="/products">
        <button className="button">Shop Now</button>
      </Link>
    </div>
  </>
);

export default Home;
