import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import "./assets/styles/style.css";

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
