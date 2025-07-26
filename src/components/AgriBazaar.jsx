import React, { useState } from "react";

const categories = ["Fertilizers", "Crop Seeds", "Pesticides", "Crops"];

const products = [
  {
    name: "Urea Fertilizer",
    category: "Fertilizers",
    price: "₹500",
    image: "https://iffco-public-assets.s3.ap-south-1.amazonaws.com/s3fs-public/2020-04/UREA_0.png",
  },
  {
    name: "Wheat Seeds",
    category: "Crop Seeds",
    price: "₹300",
    image: "https://img500.exportersindia.com/product_images/bc-500/2022/2/9445504/wheat-seeds-1644211661-6170968.jpeg",
  },
  {
    name: "Organic Neem Pesticide",
    category: "Pesticides",
    price: "₹450",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/9/EH/MY/KB/39513558/neem-oil-agricultural-pesticide.jpg",
  },
  {
    name: "Fresh Tomatoes",
    category: "Crops",
    price: "₹250",
    image: "https://media.istockphoto.com/id/847335116/photo/tomatoes-on-the-vine.jpg?s=612x612&w=0&k=20&c=XspM2ySvUfqjnt7HL5qKyn0tyRb5qLsf1GAP6-3xQsw=",
  },
  {
    name: "DAP Fertilizer",
    category: "Fertilizers",
    price: "₹600",
    image: "https://sasyamruth.com/wp-content/uploads/2024/03/DAP-chemical-fertilizer.jpg",
  },
  {
    name: "Rice Paddy Seeds",
    category: "Crop Seeds",
    price: "₹350",
    image: "https://images.meesho.com/images/products/469769773/j3yz6_512.jpg",
  },
];

export default function AgriBazaar() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.productId === product.name);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.productId === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          productId: product.name,
          name: product.name,
          price: parseInt(product.price.replace(/[^\d]/g, "")), // ₹500 → 500
          quantity: 1,
        },
      ];
    }
    setCart(updatedCart);
    // ✅ Simple alert message
  alert(`AgriBazaar says: ✅ ${product.name} added to cart`);
    console.log("Cart Updated:", updatedCart);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mt-20 min-h-screen bg-white px-4 md:px-16 py-10 flex gap-6">
      {/* Sidebar */}
      <aside className="w-1/4 hidden md:block">
        <h2 className="text-xl font-semibold text-green-700 mb-4">📦 Categories</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setSelectedCategory("All")}
              className={`block w-full text-left px-4 py-2 rounded ${
                selectedCategory === "All" ? "bg-green-100 font-bold" : ""
              }`}
            >
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedCategory === cat ? "bg-green-100 font-bold" : ""
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <main className="flex-1">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center md:text-left">
          🛒 {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <div
              key={idx}
              className="border border-gray-200 shadow-md rounded-lg p-4 bg-white hover:shadow-xl transition-all duration-200"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-green-700 font-medium mb-2">{product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-gray-500 mt-10 text-center">❌ No matching products found.</p>
        )}
      </main>
    </div>
  );
}
