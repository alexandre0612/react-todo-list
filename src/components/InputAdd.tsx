import { useState } from "react";

interface IInputAddProps {
  onAdd(value: string): void;
}
export const InputAdd = (props: IInputAddProps) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    props.onAdd(value.trim());
    setValue("");
  };

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />

      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
};
