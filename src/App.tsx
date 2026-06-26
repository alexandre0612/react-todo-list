import { useState } from "react";
import { InputAdd } from "./components/ImputAdd";
import { TodoItems } from "./components/TodoItems";
import { List } from "./components/List";

export function App() {
  const [list, setList] = useState([
    { id: "1", label: "Fazer café", complete: false },
    { id: "2", label: "Fazer café", complete: false },
    { id: "3", label: "Fazer almoço", complete: false },
    { id: "4", label: "Fazer janta", complete: false },
  ]);

  const handleAdd = (value: string) => {
    setList([
      ...list,
      { id: (list.length + 1).toString(), label: value, complete: false },
    ]);
  };

  const handleComplete = (id: string) => {
    setList([
      ...list.map((item) => ({
        ...item,
        complete: item.id === id ? true : item.complete,
      })),
    ]);
  };

  const handleDelete = (id: string) => {
    setList([...list.filter((item) => item.id !== id)]);
  };

  return (
    <div>
      <InputAdd onAdd={handleAdd} />

      <List>
        {list.map((listItem) => (
          <TodoItems
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
