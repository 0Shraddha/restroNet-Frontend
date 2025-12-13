import React, { useState, useMemo, useRef } from "react";
import { Trash2, Plus, Minus, ShoppingCart, Clock, DollarSign, Users, Printer } from "lucide-react";
import "./MenuDisplay.css";

const MenuDisplay = () => {
  // Sample menu data - replace with API call
  const [menu] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizzas",
      price: 450,
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop",
      prepTime: 15,
      description: "Classic pizza with tomato, mozzarella, and basil",
      available: true,
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      category: "Pizzas",
      price: 550,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07f4ee?w=300&h=300&fit=crop",
      prepTime: 15,
      description: "Pizza with pepperoni and mozzarella",
      available: true,
    },
    {
      id: 3,
      name: "Caesar Salad",
      category: "Salads",
      price: 280,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop",
      prepTime: 5,
      description: "Fresh romaine with Caesar dressing",
      available: true,
    },
    {
      id: 4,
      name: "Garlic Bread",
      category: "Starters",
      price: 150,
      image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300&h=300&fit=crop",
      prepTime: 8,
      description: "Toasted bread with garlic butter",
      available: true,
    },
    {
      id: 5,
      name: "Coca Cola",
      category: "Beverages",
      price: 50,
      image: "https://images.unsplash.com/photo-1554866585-acbb2f46b34c?w=300&h=300&fit=crop",
      prepTime: 1,
      description: "Cold cola soft drink",
      available: true,
    },
    {
      id: 6,
      name: "Biryani",
      category: "Main Course",
      price: 350,
      image: "https://images.unsplash.com/photo-1630383249896-424e7b45ab42?w=300&h=300&fit=crop",
      prepTime: 20,
      description: "Aromatic rice with meat and spices",
      available: true,
    },
  ]);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef();
  const [orderNumber] = useState(Math.floor(Math.random() * 10000) + 1000);
  const [orderTime] = useState(new Date());

  // Get unique categories
  const categories = useMemo(
    () => ["All", ...new Set(menu.map((item) => item.category))],
    [menu]
  );

  // Filter menu items
  const filteredMenu = useMemo(
    () =>
      menu.filter(
        (item) =>
          (selectedCategory === "All" || item.category === selectedCategory) &&
          (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [menu, selectedCategory, searchTerm]
  );

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find((c) => c.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((c) => c.id !== itemId));
  };

  // Update quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(
        cart.map((c) =>
          c.id === itemId ? { ...c, quantity } : c
        )
      );
    }
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  // Print Invoice Function
  const handlePrintInvoice = () => {
    const printWindow = window.open("", "_blank");
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice #${orderNumber}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Courier New', monospace;
            background: white;
            padding: 20px;
          }
          .invoice-container {
            width: 80mm;
            margin: 0 auto;
            background: white;
            padding: 0;
          }
          .invoice-header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 2px dashed #000;
            margin-bottom: 10px;
          }
          .restaurant-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .restaurant-contact {
            font-size: 11px;
            margin-bottom: 10px;
            line-height: 1.4;
          }
          .order-info {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            margin-bottom: 10px;
            border-bottom: 1px dashed #000;
            padding-bottom: 8px;
          }
          .order-info-item {
            display: flex;
            flex-direction: column;
          }
          .label {
            font-weight: bold;
            font-size: 10px;
          }
          .items-section {
            margin: 10px 0;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
          }
          .item-header {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 8px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            margin-bottom: 6px;
            padding: 0 2px;
          }
          .item-name {
            flex: 1;
            word-break: break-word;
          }
          .item-qty {
            text-align: center;
            width: 30px;
          }
          .item-total {
            text-align: right;
            width: 40px;
          }
          .totals-section {
            border-top: 2px dashed #000;
            padding-top: 8px;
            margin-top: 10px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .total-row.amount {
            font-size: 14px;
            padding: 5px 0;
            border-top: 1px dashed #000;
          }
          .footer {
            text-align: center;
            margin-top: 15px;
            font-size: 10px;
            padding-top: 10px;
            border-top: 2px dashed #000;
          }
          .thank-you {
            font-weight: bold;
            margin: 10px 0 5px 0;
          }
          .footer-text {
            font-size: 9px;
            color: #333;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .invoice-container {
              width: 100%;
              margin: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div class="restaurant-name">RestroNet</div>
            <div class="restaurant-contact">
              <div>Phone: +1 (555) 123-4567</div>
              <div>Address: 123 Restaurant St</div>
            </div>
          </div>

          <div class="order-info">
            <div class="order-info-item">
              <span class="label">Order #:</span>
              <span>${String(orderNumber).padStart(6, '0')}</span>
            </div>
            <div class="order-info-item">
              <span class="label">Table:</span>
              <span>#5</span>
            </div>
            <div class="order-info-item">
              <span class="label">Date:</span>
              <span>${orderTime.toLocaleDateString()}</span>
            </div>
          </div>

          <div class="order-info">
            <div class="order-info-item">
              <span class="label">Time:</span>
              <span>${orderTime.toLocaleTimeString()}</span>
            </div>
            <div class="order-info-item">
              <span class="label">Cashier:</span>
              <span>Admin</span>
            </div>
          </div>

          <div class="items-section">
            <div class="item-header">
              <div class="item-name">Item</div>
              <div class="item-qty">Qty</div>
              <div class="item-total">Total</div>
            </div>
            ${cart
              .map(
                (item) => `
              <div class="item-row">
                <div class="item-name">${item.name}</div>
                <div class="item-qty">${item.quantity}</div>
                <div class="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="totals-section">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Tax (5%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div class="total-row amount">
              <span>TOTAL:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <div class="thank-you">Thank You!</div>
            <div class="footer-text">Please visit again</div>
            <div class="footer-text" style="margin-top: 8px; font-size: 8px;">
              ${orderTime.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <script>
          window.print();
          window.onafterprint = function() {
            window.close();
          };
        </script>
      </body>
      </html>
    `;
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  };

  return (
    <div className="pos-container">
      {/* Main Content Area */}
      <div className="pos-main">
        {/* Header */}
        <div className="pos-header">
          <div className="header-left">
            <h1 className="pos-title">Menu</h1>
            <p className="pos-subtitle">Select items to add to order</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <Users size={18} />
              <span>Table #5</span>
            </div>
            <div className="stat-item">
              <Clock size={18} />
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="pos-search-section">
          <input
            type="text"
            placeholder="Search dishes..."
            className="pos-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="pos-category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="pos-menu-grid">
          {filteredMenu.map((item) => (
            <div key={item.id} className="menu-card">
              <div className="menu-card-image">
                <img src={item.image} alt={item.name} />
                <span className="prep-time">
                  <Clock size={12} /> {item.prepTime}m
                </span>
              </div>
              <div className="menu-card-content">
                <h3 className="menu-card-title">{item.name}</h3>
                <p className="menu-card-description">{item.description}</p>
                <div className="menu-card-footer">
                  <span className="menu-card-price">
                    <DollarSign size={14} /> {item.price}
                  </span>
                  <button
                    className="add-btn"
                    onClick={() => addToCart(item)}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="pos-cart-sidebar">
        <div className="cart-header">
          <ShoppingCart size={24} />
          <h2>Order Summary</h2>
          <span className="cart-badge">{cart.length}</span>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={48} />
            <p>No items in cart</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">{item.price} x {item.quantity}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="cart-divider"></div>

            {/* Totals */}
            <div className="cart-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (5%)</span>
                <span>{tax.toFixed(2)}</span>
              </div>
              <div className="total-row total">
                <span>Total</span>
                <span className="total-amount">{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="cart-actions">
              <button className="btn-secondary">Clear Order</button>
              <button className="btn-primary">Checkout</button>
              <button className="btn-print" onClick={handlePrintInvoice} title="Print Invoice">
                <Printer size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuDisplay;
