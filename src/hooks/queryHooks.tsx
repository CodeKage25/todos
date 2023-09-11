import todoService from "../services/index";
import { useQuery } from "@tanstack/react-query";

export function useGetTodos() {
  // let getTodos = (): any => todoService.getTodos();
  let getTodos = () =>  todoService.getTodosFromLocalStorage();
  return useQuery(["todos"], getTodos, {
    retry: 1,
    select: (data) => data,
    staleTime: 60 * 1000, //6 seconds
  });
}
