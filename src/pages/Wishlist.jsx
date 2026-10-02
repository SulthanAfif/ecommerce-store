import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="empty-state">
        <h1>Wishlist is empty</h1>
        <p>Simpan produk favoritmu di sini.</p>
        <Link to="/" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Wishlist ({wishlist.length})</h1>

      <div className="wishlist-list">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <Link to={`/product/${item.id}`} className="wishlist-image">
              <img src={item.image} alt={item.title} />
            </Link>

            <div className="wishlist-info">
              <p className="product-category">{item.category}</p>
              <Link to={`/product/${item.id}`}>
                <h3>{item.title}</h3>
              </Link>
              <p className="product-price">${item.price.toFixed(2)}</p>

              <div className="wishlist-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => toggleWishlist(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
