import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/useCart";

function Navbar() {
  const { totalItems, wishlist } = useCart();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">S</span>
          <span className="brand-name">Shoply</span>
        </Link>

        <form className="search-bar" onSubmit={onSearch}>
          <input
            type="text"
            placeholder="Cari produk, kategori..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">Cari</button>
        </form>

        <nav className="top-actions">
          <NavLink
            to="/wishlist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Wishlist
            {wishlist.length > 0 && (
              <span className="badge">{wishlist.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Orders
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "cart-link active" : "cart-link"
            }
          >
            <span className="cart-icon">🛒</span>
            Cart
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
