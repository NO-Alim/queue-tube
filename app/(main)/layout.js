import Footer from "@/components/footer";
import MainNav from "@/components/mainNav";

const MainLayout = ({ children }) => {
  return (
    <div className="">
      <header className="">
        <MainNav />
      </header>
      <div className=" min-h-[90vh]">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
