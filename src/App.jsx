import Content from "./content"
import Sidebar from "./sidebar"
import SidebarContext from "./contexts/SidebarContext";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
const App=()=>{
  const[sidebar,setSidebar]=useState(false);
  const handleSidebar=()=>{
    if(sidebar){
    setSidebar(!sidebar)
    }
  }
  const {i18n:{language}}=useTranslation()
  console.log(language);
  useEffect(()=>{
    let dir= language==='fa'?"rtl":'ltr';  
    document.documentElement.dir=dir;
    document.documentElement.lang=language;
  },[language])
  return(
    <BrowserRouter>
    <SidebarContext.Provider value={{
      sidebar,
      setSidebar
    }}>
    <div className='main' onClick={handleSidebar}>
      <Sidebar/>
      <Content/>
    </div>
    </SidebarContext.Provider>
    </BrowserRouter>
  )
}

export default App