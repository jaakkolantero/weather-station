import Header from "./Header";
import Footer from "./Footer";
import { NextPage } from "next";

const Layout: NextPage = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
