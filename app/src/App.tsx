import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import { Providers } from "./components/Providers";
import "./assets/styles/style.css";

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Providers>
  );
}
