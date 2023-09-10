import  { useState, useEffect } from "react";
import styles from "./home.module.css";
import { IData } from "./companent/interfaces/index";

const loadTodoData = (): IData[] => {
  const storedData = localStorage.getItem("todoData");
  return storedData ? JSON.parse(storedData) : [];
};

const saveTodoData = (data: IData[]): void => {
  localStorage.setItem("todoData", JSON.stringify(data));
};

const App = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [arr, setArr] = useState<IData[]>(loadTodoData());
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (): void => {
    if (!title.length) return;
    const newDate = {
      title: title,
      id: new Date().getTime(),
      desc: "Salomlai",
      date: new Date().toISOString(),
    };
    setArr([...arr, newDate]);
    setTitle("");
  };

  const deleteItem = (id: number): void => {
    const newData = arr.filter((e) => e.id !== id);
    setArr(newData);
  };

  const handleEdit = (id: number): void => {
    setEditingId(id);
    const editedItem = arr.find((e) => e.id === id);
    if (editedItem) {
      setTitle(editedItem.title);
    }
  };

  const handleUpdate = (): void => {
    if (editingId === null || !title.length) return;
    const updatedArr = arr.map((e) =>
      e.id === editingId ? { ...e, title: title } : e
    );
    setArr(updatedArr);
    setTitle("");
    setEditingId(null);
  };

  useEffect(() => {
    saveTodoData(arr);
  }, [arr]);

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>Todo List</h1>

      <input
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />

      {editingId === null ? (
        <button onClick={handleSubmit} className={styles.btn}>
          Add Todo
        </button>
      ) : (
        <button onClick={handleUpdate} className={styles.btn}>
          Update Todo
        </button>
      )}

      <div className={styles.card}>
        {arr.map((e) => (
          <div key={e.id} className={styles.cardItem}>
            <p className={styles.name}>{e.title}</p>
            <p className={styles.date}>
              {new Date(e.date).toLocaleString()}
            </p>
            <div className={styles.del}>
              <button
                className={styles.edit}
                onClick={() => handleEdit(e.id)}
              >
                Edit
              </button>
              <button onClick={() => deleteItem(e.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
