import Menu from "../shared/components/Menu";
import { AppRoutes } from "./router";

const codes = ["margarita", "mojito", "a1", "kir"];

export default function App() {
  return (
    <div className="container">
      <Menu codes={codes} />
      <AppRoutes />
    </div>
  );
}
