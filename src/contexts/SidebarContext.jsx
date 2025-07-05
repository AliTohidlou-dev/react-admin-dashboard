import { createContext} from "react";

const SidebarContext=createContext({
  sidebar:false,
  setSidebar:()=>{}
})
export default SidebarContext;