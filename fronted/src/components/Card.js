import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  let data = useCart();
  // default price ke liye reference liya hai
  const priceRef = useRef();
  // -----------------------------------

  let options = props.options;

  let priceOptions;
  // Restricting...
  if (options !== undefined) priceOptions = Object.keys(options);

  let foodItem = props.item;

  // add to cart ke liye
  const [qty, setQty] = useState(1); //starting me default value kuch to hona chahiye uske lliye ye dono
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    // for update
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        })
        return 
      }
      return
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // console.log(data)
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "16rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>

            <div className="container w-100 p-0" style={{ height: "38px" }}>
              <select
                className="m-2 h-100  bg-success"
                onChange={(e) => setQty(e.target.value)}
              >
                {/* yahan pe kitna number of quantiy lena hai wo select krta ha
                is se ek dropdown button ata hai javascript ke help se */}
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>
              {/* halp lena hai ya full uske liye hai ye */}
              <select
                className="m-2 h-100  bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {/* Conditional Redndering... */}
                {/* Jiska undefined arha h usko m brute forcely options de diya "half" and "full" (There are multiple ways) */}
                {priceOptions !== undefined ? (
                  priceOptions.map((data) => {
                    return (
                      <option key={data} value={data}>
                        {data}
                      </option>
                    );
                  })
                ) : (
                  <>
                    <option key={1} value={"half"}>
                      {"half"}
                    </option>{" "}
                    <option key={2} value={"full"}>
                      {"full"}
                    </option>
                  </>
                )}
              </select>
              <div className="d-inline h-100 fs-">₹{finalPrice}/-</div>
            </div>
          </div>
          <hr></hr>
          <button
            className={"btn btn-success justify-center ms-2"}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
