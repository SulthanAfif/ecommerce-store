import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import Toast from "./Toast";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const loved = isInWishlist(product.id);
  const [toast, setToast] = useState("");

  return (
    <article className="product-card">
      <Toast message={toast} onClose={() => setToast("")} />

      <button
        type="button"
        className={`wish-float ${loved ? "active" : ""}`}
        onClick={() => {
          toggleWishlist(product);
          setToast(loved ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist");
        }}
      >
        {loved ? "♥" : "♡"}
      </button>

      <Link to={`/product/${product.id}`} className="product-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <div className="rating-line">
          <span className="stars">★★★★☆</span>
          <span className="rating-text">
            {product.rating?.rate || 4.2} · {product.rating?.count || 120}{" "}
            terjual
          </span>
        </div>

        <div className="product-footer">
          <div>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-price-sub">Siap dikirim</p>
          </div>
          <button
            type="button"
            className="btn-add"
            onClick={() => {
              addToCart(product);
              setToast("Ditambahkan ke keranjang");
            }}
          >
            + Keranjang
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
