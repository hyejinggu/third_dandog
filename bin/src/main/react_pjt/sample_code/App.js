
import Main from "./components/common/Main";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Routes, Route, useParams } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
function App() {
  return (
    <div id="wrap">

      {/* <Header /> */}
      <Template>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Template>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
