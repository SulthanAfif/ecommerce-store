import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Orders() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <h1>No orders yet</h1>
        <p>Riwayat pesanan akan muncul di sini setelah checkout.</p>
        <Link to="/" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Order History</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="order-date">
                  {new Date(order.date).toLocaleString("id-ID")}
                </p>
              </div>
              <strong>${order.total.toFixed(2)}</strong>
            </div>

            <div className="order-customer">
              <p>
                {order.customer.name} · {order.customer.email}
              </p>
              <p>
                {order.customer.address}, {order.customer.city}
              </p>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <span>
                      {item.qty} × ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
