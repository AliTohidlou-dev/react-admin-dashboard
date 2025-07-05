import { useContext } from "react";
import SidebarContext from "./contexts/SidebarContext";

const SidebarIcon = () => {
  const { sidebar, setSidebar } = useContext(SidebarContext);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <div className="sidebarIcon" onClick={handleSidebar}>
        <div
          className="lineOne"
          style={{ borderColor: sidebar ? "white" : "black" }}
        ></div>
        <div
          className="lineTwo"
          style={{ borderColor: sidebar ? "white" : "black" }}
        ></div>
        <div
          className="lineThree"
          style={{ borderColor: sidebar ? "white" : "black" }}
        ></div>
      </div>
    </>
  );
};
export default SidebarIcon;