import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

function Checkout() {
  const { cart, totalPrice, placeOrder } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const discount = location.state?.discount || 0;
  const coupon = location.state?.coupon || null;
  const finalTotal = location.state?.finalTotal ?? totalPrice;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });
  const [payment, setPayment] = useState("transfer");
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState(null);

  if (cart.length === 0 && !done) {
    return (
      <div className="empty-state">
        <h1>Tidak ada item untuk checkout</h1>
        <Link to="/" className="btn-primary">
          Kembali belanja
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = placeOrder({
      ...form,
      payment,
      coupon,
      discount,
      finalTotal,
    });

    setOrderId(order.id);
    setDone(true);
  };

  if (done) {
    return (
      <div className="empty-state">
        <h1>Pembayaran Berhasil (Simulasi)</h1>
        <p>
          Order <strong>#{orderId}</strong> sudah dicatat.
        </p>
        <p className="pay-note">
          Metode: <strong>{payment.toUpperCase()}</strong> · Total:{" "}
          <strong>${finalTotal.toFixed(2)}</strong>
        </p>
        <div className="success-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate("/orders")}
          >
            Lihat Orders
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/")}
          >
            Lanjut Belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Data Pengiriman</h2>

          <label>
            Nama Lengkap
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Alamat
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Kota
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </label>

          <h2 className="pay-title">Metode Pembayaran</h2>
          <div className="payment-methods">
            <label
              className={
                payment === "transfer" ? "pay-item active" : "pay-item"
              }
            >
              <input
                type="radio"
                name="payment"
                value="transfer"
                checked={payment === "transfer"}
                onChange={(e) => setPayment(e.target.value)}
              />
              Transfer Bank
            </label>
            <label
              className={payment === "ewallet" ? "pay-item active" : "pay-item"}
            >
              <input
                type="radio"
                name="payment"
                value="ewallet"
                checked={payment === "ewallet"}
                onChange={(e) => setPayment(e.target.value)}
              />
              E-Wallet
            </label>
            <label
              className={payment === "cod" ? "pay-item active" : "pay-item"}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />
              COD (Bayar di tempat)
            </label>
          </div>

          <button type="submit" className="btn-primary full">
            Bayar Sekarang
          </button>
        </form>

        <aside className="cart-summary">
          <h2>Ringkasan</h2>
          {cart.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.title.slice(0, 22)}... × {item.qty}
              </span>
              <strong>${(item.price * item.qty).toFixed(2)}</strong>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Diskon {coupon ? `(${coupon})` : ""}</span>
            <strong>- ${discount.toFixed(2)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total Bayar</span>
            <strong>${finalTotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
