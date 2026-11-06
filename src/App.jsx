
import "./App.css";

// Importamos nossos componentes
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <div>
      {/* Menu de navegação */}
      <Header />

      {/* Apresentação inicial */}
      <Home />
    </div>
  );
}

export default App;
