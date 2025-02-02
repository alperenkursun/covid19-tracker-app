import "./App.css";
import Footer from "./components/Footer/Footer";
import Graph from "./components/Graph/Graph";
import Header from "./components/Header/Header";
import Info from "./components/Info/Info";
import Input from "./components/Input/Input";

function App() {
  return (
    <div className="app">
      <Header />
      <Info />
      <Input />
      <Graph />
      <Footer />
    </div>
  );
}

export default App;
