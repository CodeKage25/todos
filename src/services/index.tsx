import axios, { AxiosResponse } from "axios";

const todoAxios = axios.create();

const todoService = {
  getTodos: async () => {
    const response = await todoAxios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response;
  },
  getTodosFromLocalStorage: async () => {
    let tasks = await Array.from(
      JSON.parse(localStorage.getItem("tasks") || "[]")
    );
    let res = {
      data: tasks,
    };
    return res as unknown as AxiosResponse;
  },
  addTodoToLocalStorage: async (task: any) => {
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        {
          title: task.title,
          completed: false,
          id: Math.floor(Math.random() * (9999 - 1000) + 1000), //generate random id
          userId: 1,
          alarmTime: task.alarmTime,
          date: task.date,
          startTime: task.startTime,
          endTime: task.endTime,
        },
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      ])
    );
  },
  editTodoInLocalStorage: async (
    taskId: string,
    title: string,
    alarmTime: string,
    date: Date,
    startTime: string,
    endTime: string
  ) => {
    let data = JSON.parse(localStorage.getItem("tasks")!);
    let objIndex = data.findIndex((obj: any) => obj.id == taskId);
    data[objIndex].title = title;
    data[objIndex].alarmTime = alarmTime;
    data[objIndex].date = date;
    data[objIndex].startTime = startTime;
    data[objIndex].endTime = endTime;
    localStorage.setItem("tasks", JSON.stringify(data));
  },
  editTodoCompletedState: async (taskId: string, completed: boolean) => {
    let data = JSON.parse(localStorage.getItem("tasks")!);
    let objIndex = data.findIndex((obj: any) => obj.id == taskId);
    data[objIndex].completed = completed;
    localStorage.setItem("tasks", JSON.stringify(data));
  },
  removeTodoFromLocalStorage: async (taskId: string) => {
    let data = JSON.parse(localStorage.getItem("tasks")!);
    let objIndex = data.findIndex((obj: any) => obj.id == taskId);
    data.splice(objIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(data));
  },
};

export default todoService;
