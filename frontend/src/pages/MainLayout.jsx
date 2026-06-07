import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AIChatModal from "../components/AIChatModal";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="flex">
          <Sidebar setShowChat={setShowChat} />
      <div className=" flex-1">
        <Outlet />
      </div>
       <AIChatModal
            show={showChat}
            setShow={setShowChat}
          />
    </div>
  );
};

export default MainLayout;