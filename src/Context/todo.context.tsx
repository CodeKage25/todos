import { createContext, useContext, useState, ReactNode } from "react";

export const todoInitialState: string = "";

export type todoContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

export const TodoContext = createContext<todoContextType>([
  todoInitialState,
  () => null,
]);

type Props = {
  children?: ReactNode;
};

export function TodoProvider({ children }: Props) {
  const [selectedTodoId, setSelectedTodoId] = useState(todoInitialState);

  return (
    <TodoContext.Provider value={[selectedTodoId, setSelectedTodoId]}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext<todoContextType>(TodoContext);
}
