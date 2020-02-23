import Header from "./Header";
import Footer from "./Footer";
import { NextPage } from "next";

const Layout: NextPage = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
};

export default Layout;
