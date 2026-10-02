import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const COUPONS = {
  SHOPLY10: 0.1, // 10%
  HEMAT20: 0.2, // 20%
  ONGKIR: 5, // potongan nominal $5
};

function Cart() {
  const { cart, updateQty, removeFromCart, totalPrice, totalItems } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(null);
  const [couponError, setCouponError] = useState("");

  const discount = useMemo(() => {
    if (!applied) return 0;
    if (applied === "ONGKIR") return Math.min(5, totalPrice);
    return totalPrice * (COUPONS[applied] || 0);
  }, [applied, totalPrice]);

  const finalTotal = Math.max(0, totalPrice - discount);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!COUPONS[code]) {
      setApplied(null);
      setCouponError("Kode kupon tidak valid");
      return;
    }
    setApplied(code);
    setCouponError("");
  };

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h1>Keranjang kosong</h1>
        <p>Tambahkan produk untuk mulai belanja.</p>
        <Link to="/" className="btn-primary">
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Cart ({totalItems})</h1>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>

                <div className="cart-item-actions">
                  <div className="qty-box">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <div className="cart-item-total">
                ${(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Ringkasan Belanja</h2>

          <div className="coupon-box">
            <input
              type="text"
              placeholder="Kode kupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button type="button" onClick={applyCoupon}>
              Pakai
            </button>
          </div>

          {couponError && <p className="coupon-error">{couponError}</p>}
          {applied && (
            <p className="coupon-success">
              Kupon <strong>{applied}</strong> dipakai
            </p>
          )}

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Diskon</span>
            <strong>- ${discount.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Ongkir</span>
            <strong>Gratis</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>${finalTotal.toFixed(2)}</strong>
          </div>

          <Link
            to="/checkout"
            state={{ discount, coupon: applied, finalTotal }}
            className="btn-primary full"
          >
            Checkout
          </Link>

          <p className="coupon-hint">
            Coba: <code>SHOPLY10</code>, <code>HEMAT20</code>,{" "}
            <code>ONGKIR</code>
          </p>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
