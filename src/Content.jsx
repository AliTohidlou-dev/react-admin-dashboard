import { Route, Routes } from "react-router-dom";
import Posts from "./Posts/Posts";
import SidebarIcon from "./SidebarIcon";
import UsersList from "./Users/UsersList";
import Gallery from "./Gallery/Gallery";
import ToDo from "./ToDo/ToDo";
import AddUser from "./Users/AddUser";
import Message from "./Users/Message";
import Lang from "./lang/lang";

const Content = () => {
  return (
    <>
      <SidebarIcon />
      <div className="mainContent">
        <Lang/>
        <Routes>
          <Route path="/users" element={<UsersList />} />
          <Route path="/add-user/" element={<AddUser />}>
            <Route path=":id" element={<Message />} />
          </Route>
          <Route path="/posts" element={<Posts />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/toDo" element={<ToDo />} />
          <Route path="*" element={<UsersList />} />
        </Routes>
      </div>
    </>
  );
};
export default Content;
