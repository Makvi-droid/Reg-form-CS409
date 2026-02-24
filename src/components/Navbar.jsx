import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
      <button onClick={() => goTo("/")}>Home</button>
      <button onClick={() => goTo("/about")}>About</button>
      <button onClick={() => goTo("/service")}>Service</button>
    </nav>
  );
}

export default Navbar;
