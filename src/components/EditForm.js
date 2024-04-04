import styles from "./ViewList.module.css";

import { useContext } from "react";
import ModeContext from "../context/ModeContext";

function EditForm({ form, editForm, updateList, onCancel }) {
  const modeCtx = useContext(ModeContext);

  const updateName = (name) => {
    editForm((form) => ({ ...form, name: name }));
  };

  const updateQuantity = (quantity) => {
    editForm((form) => ({ ...form, quantity: quantity }));
  };

  const updatePrice = (price) => {
    editForm((form) => ({ ...form, price: price }));
  };

  const updateDiscount = (discount) => {
    editForm((form) => ({ ...form, discount: discount }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateList(form.id);
    onCancel(); //set the showForm state as false and hide the form once we submit the update
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <table className={`${styles.table} ${!modeCtx.isLight && styles.dark}`}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Disc %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => updateQuantity(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => updatePrice(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={form.discount}
                  onChange={(e) => updateDiscount(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button>Update</button>
      <button onClick={onCancel}>Cancel</button>{" "}
      {/* set the showForm state as false and hide the form */}
    </form>
  );
}
export default EditForm;
