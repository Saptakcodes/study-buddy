import { RouterProvider } from "react-router-dom";
import router from "./Layout/router";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
