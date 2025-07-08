import { Route, Routes } from "react-router-dom";
import Post from "./Posts/Posts";
import SidebarIcon from "./SidebarIcon";
import UserList from "./Users/UsersList";
import Gallery from "./Gallery/Gallery";
import ToDo from "./ToDo/ToDo";
import AddUser from "./Users/AddUser";
import Message from "./Users/Message";
import Lang from "./lang/lang";
import AddPost from "./Posts/AddPost";

const Content = () => {
  return (
    <>
      <SidebarIcon />
      <div className="mainContent">
        <Lang />
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/add-user/" element={<AddUser />}>
            <Route path=":id" element={<Message />} />
          </Route>
          <Route path="/posts" element={<Post />} />
          <Route path="/add-post/" element={<AddPost/>}>
            <Route path=":id" element={<Message />} />
          </Route>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/toDo" element={<ToDo />} />
          <Route path="*" element={<UserList />} />
        </Routes>
      </div>
    </>
  );
};
export default Content;
