import Footer from "@/components/footer";
import MainNav from "@/components/mainNav";

export const metadata = {
  title: "Queue Tube - Effortless Playlist Management",
  description:
    "Queue Tube lets you organize, watch, and take notes on your favorite video playlists distraction-free. Add up to 20 playlists, set favorites, and track videos smarter.",
};
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
