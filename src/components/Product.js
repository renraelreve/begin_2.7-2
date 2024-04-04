import { v4 as uuid } from "uuid";
import { useState, useContext, useMemo } from "react";

import styles from "./Product.module.css";
import Card from "./Card";
import ViewList from "./ViewList";
import EditForm from "./EditForm";

import ProductContext from "../context/ProductContext";
import ModeContext from "../context/ModeContext";
import Toggle from "./Toggle";

function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
    discount: 0,
  });
  const [showForm, setShowForm] = useState(false);
  // const [sumTotal, setSumTotal] = useState(0);

  /*
    CREATE: Add a new product into the list
  */
  const handlerAddProduct = () => {
    const newItem = {
      id: uuid(), // Call uuid() here
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: (ctx.count * ctx.price * (100 - ctx.discount)) / 100,
    };
    const newList = [...list, newItem];
    setList(newList);
    // const sum = sumTotal + newItem.total;
    // setSumTotal(sum);
  };

  const handlerEditProduct = (id) => {
    const newForm = list.filter((item) => item.id === id);
    setForm(newForm[0]);
  };

  const handlerDeleteProduct = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    // const sum = newList.reduce((acc, i) => acc + i.total, 0);
    // setSumTotal(sum);
  };

  const total = useMemo(() => {
    return list.reduce(
      (accumulated, currentItem) => accumulated + currentItem.total,
      0
    );
  }, [list]);

  const updateList = (id) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Number(form.quantity),
          name: form.name,
          price: Number(form.price),
          discount: Number(form.discount),
          total: (form.quantity * form.price * (100 - form.discount)) / 100,
        };
      }
      return item; // Return the original item if the condition doesn't match
    });
    // Now you should do something with newList, for example, update the state
    setList(newList);
  };

  const onEdit = () => setShowForm(true);
  const onCancel = () => setShowForm(false);
  //---------------------------------------------------------------------------

  return (
    <div className={`${styles.container} ${modeCtx.isDark && styles.dark}`}>
      <Toggle />
      <Card handlerAddProduct={handlerAddProduct} />
      <ViewList
        list={list}
        sum={total}
        handlerDeleteItem={handlerDeleteProduct}
        handlerEditItem={handlerEditProduct}
        onEdit={onEdit}
      />
      {showForm && (
        <EditForm
          form={form}
          editForm={setForm}
          updateList={updateList}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

export default Product;
