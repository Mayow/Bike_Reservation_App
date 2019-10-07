import React, { useState } from "react";

function Name({ product }) {
  return (
    <div className="productTitle" style={{ marginLeft: "20px" }}>
      <div style={{ marginBottom: "20px" }}> {product.name}</div>
      <Image product={product} />
    </div>
  );
}

function Image({ product }) {
  return (
    <div>
      <img
        alt=""
        className="productImage"
        src={product.image}
        width="230"
        height="212"
      />
    </div>
  );
}

function Price({ product }) {
  const fontWeight = {
    fontWeight: "bold",
    marginRight: "5px"
  };
  const fontSize = {
    fontSize: "18px"
  };

  return (
    <div className="price_product">
      <div className="price" style={fontSize}>
        <span style={fontWeight}>Price:</span>
        {product.price}
      </div>

      <div style={fontSize}>
        <span style={fontWeight}>Product Type:</span>
        {product.product_type}
      </div>
    </div>
  );
}

function Product({ product, index, reserve }) {
  let pinValue;

  if (product.isReserved) {
    pinValue = "Reserved";
  } else {
    pinValue = "Not Reserved";
  }

  return (
    <div>
      <div className="product">
        <Name product={product} />
        <Price product={product} />
        <span>
          <button
            className="reserveButton"
            style={{
              height: "60px",
              width: "100px",
              backgroundColor: product.isReserved ? "Green" : "",
              fontSize: product.isReserved ? "15px" : "13px"
            }}
            onClick={() => reserve(index)}
          >
            {pinValue}
          </button>
        </span>
      </div>
    </div>
  );
}

function SearchForm({ productList, reserve }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    const found = productList.find(
      el => el.name.toLowerCase() === value.toLowerCase()
    );

    if (found) {
      if (!productList[found.id - 1].isReserved) {
        reserve(found.id - 1);
        (function caller() {
          success();
        })();
      }
    } else {
      (function caller() {
        failed();
      })();
    }

    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      Reserve
      <input
        style={{ marginLeft: "20px", marginBottom: "10px", marginTop: "10px" }}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function failed() {
  var styler = document.createElement("div");

  styler.setAttribute(
    "style",
    "border:solid 5px black;top:8%; left:20%; background-color:red;position:fixed; color:black; font-size:0.5em;"
  );
  styler.innerHTML = "<h1> Product not found. Please try again. </h1>";

  setTimeout(function() {
    styler.parentNode.removeChild(styler);
  }, 1500);

  document.body.appendChild(styler);
}

function success() {
  var styler = document.createElement("div");
  styler.setAttribute(
    "style",
    "border:solid 5px black;top:8%; left:30%; background-color:Green;position:fixed; color:black; font-size:0.8em;"
  );
  styler.innerHTML = "<h1> Product reserved </h1>";

  setTimeout(function() {
    styler.parentNode.removeChild(styler);
  }, 1500);

  document.body.appendChild(styler);
}

function App() {
  //I had to modify all of the "http" values in the links to "https" for it work
  var bikes = {
    products: [
      {
        id: 1,
        name: "Adult Male Bike",
        price: 20.5,
        image: "https://via.placeholder.com/250x250?text=Adult%20Male%20Bike",
        product_type: "bike"
      },
      {
        id: 2,
        name: "Adult Female Bike",
        price: 20.5,
        image: "https://via.placeholder.com/250x250?text=Adult%20Female%20Bike",
        product_type: "bike"
      },
      {
        id: 3,
        name: "Kids Unisex Bike",
        price: 12.75,
        image: "https://via.placeholder.com/250x250?text=Kids%20Unisex%20Bike",
        product_type: "bike"
      },
      {
        id: 4,
        name: "Adult Unisex Helmet",
        price: 4.0,
        image:
          "https://via.placeholder.com/250x250?text=Adult%20Unisex%20Helmet",
        product_type: "accessory"
      },
      {
        id: 5,
        name: "Kids Unisex Helmet",
        price: 3.5,
        image:
          "https://via.placeholder.com/250x250?text=Kids%20Unisex%20Helmet",
        product_type: "accessory"
      },
      {
        id: 6,
        name: "Insurance",
        price: 9.99,
        image: "https://via.placeholder.com/250x250?text=Insurance",
        product_type: "addon"
      }
    ]
  };

  const [productList, setProductList] = useState(bikes["products"]);

  const reserve = index => {
    if (!newProductList[index].isReserved) {
      if (confirm("Are you sure you want to reserve this item?")) {
        newProductList[index].isReserved = !newProductList[index].isReserved;
        setProductList(newProductList);
        success();
      }
    } else if (newProductList[index].isReserved) {
      if (confirm("Are you sure you want to return this item?")) {
        newProductList[index].isReserved = !newProductList[index].isReserved;
        setProductList(newProductList);
      }
    }
  };

  const [SearchValue, setSearchValue] = useState("");

  const filterProductList = e => {
    setSearchValue(e.target.value);
  };

  let newProductList = productList.filter(item => {
    return item.name.toLowerCase().search(SearchValue.toLowerCase()) !== -1;
  });

  return (
    <div className="app">
      <h1 className="title"> Bike Reservation App</h1>
      <div className="product-list">
        {newProductList.map((product, index) => (
          <Product
            key={index}
            index={index}
            product={product}
            reserve={reserve}
          />
        ))}
        <SearchForm productList={productList} reserve={reserve} /> Search.....
        <input
          style={{ marginLeft: "8px" }}
          type="text"
          className="center-block"
          placeholder="Filter here..."
          onChange={filterProductList}
        />
      </div>
    </div>
  );
}

export default App;
