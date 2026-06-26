interface ITodoListProp {
  id: string;
  label: string;
  complete: boolean;
  onComplete(): void;
  onDelete(): void;
}
export const TodoItems = ({
  id,
  label,
  complete,
  onComplete,
  onDelete,
}: ITodoListProp) => {
  return (
    <li key={id}>
      {label}

      {complete ? "Concluído" : ""}

      <button onClick={onComplete}>Concluir</button>
      <button onClick={onDelete}>Remover</button>
    </li>
  );
};
