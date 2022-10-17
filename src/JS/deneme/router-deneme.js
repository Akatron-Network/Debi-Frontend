import { Outlet, Link } from "react-router-dom";

export default function RouterDeneme() {

  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="users">Users</Link>
      </nav>

      <Outlet />
    </div>
  );
}