import "./App.css";
import Footer from "./components/Footer";
import MainTodo from "./components/MainTodo";
import Nav from "./components/Nav";
import { MenuProvider } from "./Context/menu.context";
import { TodoProvider } from "./Context/todo.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <TodoProvider>
      <MenuProvider>
        <>
          <Nav />
          <MainTodo />
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      </MenuProvider>
    </TodoProvider>
  );
}

export default App;
