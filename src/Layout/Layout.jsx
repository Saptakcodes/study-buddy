import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  // const { user } = useUser();

  return (
    <>
      <Navbar />
      {/* <div className="w-full text-right p-4 pr-8 text-sm text-gray-600">
        👋 Hello, {user?.firstName || user?.username}!{" "}
         <SignOutButton>
          <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Sign Out
          </button>
        </SignOutButton> 
      </div> */}

      <main className="min-h-screen pt-20  ">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
