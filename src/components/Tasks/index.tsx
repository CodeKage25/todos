import { useState } from "react";
import { useGetTodos } from "../../hooks/queryHooks";
import TasksPagination from "../TasksPagination";
import TodoItem from "../TodoItem";

type Props = {
  selected?: Date;
};
export default function Tasks({ selected }: Props) {
  const { data: todos } = useGetTodos();
  let todosFilteredWtihDate = todos?.data;
  if (selected) {
    todosFilteredWtihDate = todos?.data.filter((todos: any) => {
      return new Date(todos.date).toDateString() === selected.toDateString();
    });
  } else {
    todosFilteredWtihDate = todos?.data;
  }
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = todosFilteredWtihDate?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(todosFilteredWtihDate?.length / itemsPerPage);
  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % todosFilteredWtihDate?.length;
    setItemOffset(newOffset);
  };
  if (todos?.data.length === 0)
    return (
      <>
        <h5 className="text-gray-900 text-base font-semibold mb-4">My Tasks</h5>
        <div className="text-center mt-9">You've not added any task yet</div>
      </>
    );
  return (
    <>
      <h5 className="text-gray-900 text-base font-semibold mb-4">My Tasks</h5>
      {todosFilteredWtihDate?.length === 0 ? (
        <div className="text-center mt-9">
          You do not have any task for the selected day, unselected the day to
          view all your tasks or select another day
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            {currentItems?.map((todo: any) => (
              <TodoItem
                title={todo.title}
                completed={todo.completed}
                id={todo.id}
                key={todo.id}
                date={todo.date}
                startTime={todo.startTime}
                endTime={todo.endTime}
              />
            ))}
          </div>
          <TasksPagination
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
        </>
      )}
    </>
  );
}
