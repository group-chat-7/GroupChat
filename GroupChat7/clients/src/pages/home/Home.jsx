import RandomButton from "../../components/RandomButton";
import Upgrade from "../../components/Upgrade";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
const Home = () => {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hiden bg-blue-400 bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0">
          <Sidebar />
          <MessageContainer />
          <Upgrade />
          <RandomButton />
        </div>
      </div>
    </>
  );
};

export default Home;
