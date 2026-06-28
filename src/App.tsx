import { useEffect, useState } from "react";
import { InputAdd } from "./components/InputAdd";
import { TodoItems } from "./components/TodoItems";
import { List } from "./components/List";
import { TodoAPI, type ITodo } from "./shared/services/api/TodoApi";

export function App() {
  const [list, setList] = useState<ITodo[]>([]);

  useEffect(() => {
    TodoAPI.getAll().then((data) => setList(data));
  }, []);

  const handleAdd = (value: string) => {
    TodoAPI.create({ label: value, complete: false }).then((data) =>
      setList([...list, data]),
    );
  };

  const handleComplete = (id: string) => {
    TodoAPI.updateById(id, { complete: true }).then(() => {
      setList([
        ...list.map((item) => ({
          ...item,
          complete: item.id === id ? true : item.complete,
        })),
      ]);
    });
  };

  const handleDelete = (id: string) => {
    TodoAPI.deleteById(id).then(() => {
      setList([...list.filter((item) => item.id !== id)]);
    });
  };

  return (
    <div>
      <InputAdd onAdd={handleAdd} />

      <List>
        {Array.isArray(list) &&
          list.map((listItem) => (
            <TodoItems
              key={listItem.id}
              id={listItem.id}
              label={listItem.label}
              complete={listItem.complete}
              onComplete={() => handleComplete(listItem.id)}
              onDelete={() => handleDelete(listItem.id)}
            />
          ))}
      </List>
    </div>
  );
}
