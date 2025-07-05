import { useContext } from "react";
import SidebarContext from "./contexts/SidebarContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Sidebar = () => {
  const {t}=useTranslation();
  const { sidebar } = useContext(SidebarContext);
  return (
    <div className="sidebar" style={{ minWidth: sidebar ? "200px" : "0px" }}>
      <div className="sidebarContent">
        <img src="/images/blank-profile-pic.jpg" alt="" />
        <div className="links">
          <NavLink className={({isActive})=>isActive?"active":''} to={"/users"}>
            <p>{t("Users list")}</p>
          </NavLink>
          <NavLink className={({isActive})=>isActive?"active":''} to={"/posts"}>
            <p>{t("Posts")}</p>
          </NavLink>
          <NavLink className={({isActive})=>isActive?"active":''} to={"/gallery"}>
            <p>{t("Gallery")}</p>
          </NavLink>
          <NavLink className={({isActive})=>isActive?"active":''} to={"/ToDo"}>
            <p>{t("ToDo")}</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
