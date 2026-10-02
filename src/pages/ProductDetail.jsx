import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/useCart";
import Loading from "../components/Loading";
import Toast from "../components/Toast";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        const data = await res.json();
        setProduct(data);

        // Recently viewed
        const prev = JSON.parse(localStorage.getItem("shop-recent") || "[]");
        const filtered = prev.filter((p) => p.id !== data.id);
        const next = [
          {
            id: data.id,
            title: data.title,
            price: data.price,
            image: data.image,
          },
          ...filtered,
        ].slice(0, 6);
        localStorage.setItem("shop-recent", JSON.stringify(next));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;
  if (!product) return null;

  const loved = isInWishlist(product.id);

  const reviews = [
    {
      name: "Alya",
      rating: 5,
      text: "Barang sesuai deskripsi, pengiriman cepat.",
    },
    {
      name: "Bima",
      rating: 4,
      text: "Kualitas oke, packing rapi.",
    },
    {
      name: "Citra",
      rating: 5,
      text: "Recommended seller, bakal beli lagi.",
    },
  ];

  return (
    <div className="detail-page">
      <Toast message={toast} onClose={() => setToast("")} />
      <Link to="/" className="back-link">
        ← Kembali ke produk
      </Link>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h1>{product.title}</h1>

          <div className="rating-line detail-rating">
            <span className="stars">★★★★☆</span>
            <span className="rating-text">
              {product.rating?.rate || 4.2} · {product.rating?.count || 120}{" "}
              ulasan
            </span>
          </div>

          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-actions">
            <div className="qty-box">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                addToCart(product, qty);
                setToast("Ditambahkan ke keranjang");
              }}
            >
              + Keranjang
            </button>

            <button
              type="button"
              className={`btn-wish-lg ${loved ? "active" : ""}`}
              onClick={() => {
                toggleWishlist(product);
                setToast(
                  loved ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist",
                );
              }}
            >
              {loved ? "♥ Wishlisted" : "♡ Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="reviews-section">
        <h2>Ulasan Pembeli</h2>
        <div className="reviews-list">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-top">
                <strong>{r.name}</strong>
                <span className="stars">{"★".repeat(r.rating)}</span>
              </div>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
