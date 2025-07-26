import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const categories = ["Fertilizers", "Crop Seeds", "Pesticides", "Crops"];

const products = [
  // Fertilizers
  {
    name: "Urea Fertilizer",
    category: "Fertilizers",
    price: 500,
    image: "https://th.bing.com/th/id/OIP.w-XSZ-EF13U17n42DuOWDQAAAA?w=193&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "DAP Fertilizer",
    category: "Fertilizers",
    price: 800,
    image: "https://th.bing.com/th/id/OIP.bfrtqsLKip-3eBb7r37WEgHaH6?w=165&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "Compost Organic Fertilizer",
    category: "Fertilizers",
    price: 350,
    image: "https://th.bing.com/th/id/OIP.XE1UfvLRJmaMw-6z57PXEQHaEK?w=329&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },

  // Crop Seeds
  {
    name: "Wheat Seeds",
    category: "Crop Seeds",
    price: 300,
    image: "https://th.bing.com/th/id/OIP.Kp5bI4BswBu--E5BzVjGHwHaFl?w=263&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "Rice Paddy Seeds",
    category: "Crop Seeds",
    price: 280,
    image: "https://th.bing.com/th/id/OIP.7MyLF7Q8oSJrYc4q6EBIxwHaFZ?w=264&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "Maize Hybrid Seeds",
    category: "Crop Seeds",
    price: 400,
    image: "https://th.bing.com/th/id/OIP.hzFLUXOlno3LEvW3i_BsiQHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },

  // Pesticides
  {
    name: "Neem Pesticide",
    category: "Pesticides",
    price: 200,
    image: "https://th.bing.com/th/id/OIP.DNQZrs6tSMUt4fqe55pk5AHaHa?w=165&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "Bio Insecticide",
    category: "Pesticides",
    price: 180,
    image: "https://th.bing.com/th/id/OIP.Dhd5AK8OvJ4ScuDUGIHmggHaHa?w=170&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "Fungal Spray",
    category: "Pesticides",
    price: 220,
    image: "https://th.bing.com/th/id/OIP.nf2MFSbYh-kyo2n0S5E4rgHaHa?w=188&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },

  // Crops
  {
    name: "Fresh Tomatoes",
    category: "Crops",
    price: 150,
    image: "https://th.bing.com/th/id/OIP.xdN62gNcVWLEEgxIFECpBQHaF6?w=222&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "Organic Potatoes",
    category: "Crops",
    price: 100,
    image: "https://th.bing.com/th/id/OIP.niYvK3-p7zMbhGmIV_zLiwHaFj?w=225&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    name: "Green Chilies",
    category: "Crops",
    price: 130,
    image: "https://th.bing.com/th/id/OIP.hNIY2asPkysdurqGqXVtHgHaFj?w=230&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  }
];


export default function AgriBazaar() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.name === product.name);
    if (exists) {
      toast.error("Item already in the cart");
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`Item added to cart (Scroll down to view cart)`);
    }
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    } else {
      toast.error("Minimum quantity is 1");
    }
  };

  const deleteItem = (index) => {
    const itemName = cart[index].name;
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    toast.success(`${itemName} removed from cart`);
  };

const handlePlaceOrder = () => {
  const orderDetails = cart
    .map(
      (item, i) =>
        `${i + 1}. ${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
    )
    .join("\n");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const message = `🛍️ *AgriBazaar Order Summary*:\n\n${orderDetails}\n\n💰 *Total: ₹${totalAmount}*\n\nPlease confirm my order.`;

  const phoneNumber = "8839170393"; // Replace with your actual WhatsApp number (in international format without +)

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};


  return (
    <>
      <Toaster />
      <div className="max-w-6xl mx-auto px-4 py-8 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-green-800">🌾 AgriBazaar</h1>

        {/* Category Filter */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === "All"
                ? "bg-green-700 text-white"
                : "bg-white text-green-700 border-green-700"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat
                  ? "bg-green-700 text-white"
                  : "bg-white text-green-700 border-green-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md bg-white flex flex-col items-center"
            >
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/150x100?text=No+Image"
                }
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-green-700 font-semibold mb-2">
                ₹{product.price}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <p className="text-gray-500 mt-10 text-center">
            ❌ No matching products found.
          </p>
        )}

        {/* Cart Section */}
        {cart.length > 0 && (
          <div className="mt-16 border-t pt-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              🛍️ Your Cart
            </h2>
            <table className="w-full table-auto border mb-6">
              <thead>
                <tr className="bg-green-100 text-left">
                  <th className="p-2 border">Item</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Subtotal</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">₹{item.price}</td>
                    <td className="p-2 border">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(index)}
                          className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(index)}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 border">
                      ₹{item.price * item.quantity}
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => deleteItem(index)}
                        className="text-red-600 hover:underline"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold bg-green-50">
                  <td colSpan="3" className="p-2 border text-right">
                    Total:
                  </td>
                  <td className="p-2 border">
                    ₹
                    {cart.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </td>
                  <td className="p-2 border"></td>
                </tr>
              </tfoot>
            </table>

            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg"
            >
              🧾 Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
