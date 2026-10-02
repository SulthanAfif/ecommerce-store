import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") || "";
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceCeiling, setPriceCeiling] = useState(1000);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [productRes, categoryRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        if (!productRes.ok) throw new Error("Gagal mengambil produk");
        const productData = await productRes.json();
        const categoryData = await categoryRes.json();
        setProducts(productData);
        setCategories(categoryData);

        if (productData.length > 0) {
          const highest = Math.ceil(Math.max(...productData.map((p) => p.price)));
          setPriceCeiling(highest);
          setMaxPrice(highest);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shop-recent") || "[]");
    setRecent(data);
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "name") list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [products, category, search, sortBy, minPrice, maxPrice]);

  const flashSale = products.slice(0, 4);

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="home">
      <section className="hero-strip">
        <div>
          <h1>Temukan produk terbaik</h1>
          <p>Belanja mudah, cepat, dan aman — gaya marketplace modern.</p>
        </div>
      </section>

      {flashSale.length > 0 && (
        <section className="flash-section">
          <div className="flash-header">
            <h2>⚡ Flash Sale</h2>
            <span className="flash-badge">Diskon spesial hari ini</span>
          </div>
          <div className="flash-grid">
            {flashSale.map((p) => (
              <ProductCard key={`flash-${p.id}`} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="category-row">
        <button
          className={category === "all" ? "chip active" : "chip"}
          onClick={() => setCategory("all")}
          type="button"
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "chip active" : "chip"}
            onClick={() => setCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="price-filter">
        <div className="price-filter-top">
          <strong>Filter Harga</strong>
          <span>
            ${minPrice} — ${maxPrice}
          </span>
        </div>

        <label className="range-label">
          Harga minimum
          <input
            type="range"
            min="0"
            max={priceCeiling}
            step="1"
            value={minPrice}
            onChange={(e) => {
              const val = Number(e.target.value);
              setMinPrice(Math.min(val, maxPrice));
            }}
          />
        </label>

        <label className="range-label">
          Harga maksimum
          <input
            type="range"
            min="0"
            max={priceCeiling}
            step="1"
            value={maxPrice}
            onChange={(e) => {
              const val = Number(e.target.value);
              setMaxPrice(Math.max(val, minPrice));
            }}
          />
        </label>
      </div>

      <div className="result-bar">
        <p>
          {filtered.length} produk
          {search ? ` untuk “${search}”` : ""}
        </p>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Terlaris</option>
          <option value="price-asc">Harga terendah</option>
          <option value="price-desc">Harga tertinggi</option>
          <option value="name">Nama A-Z</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">Produk tidak ditemukan.</p>
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {recent.length > 0 && (
        <section className="recent-section">
          <h2>Terakhir Dilihat</h2>
          <div className="products-grid">
            {recent.map((p) => (
              <ProductCard key={`recent-${p.id}`} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
