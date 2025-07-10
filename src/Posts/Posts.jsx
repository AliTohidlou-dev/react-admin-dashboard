import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import WithAlert from "../HOC/withAlert";
import ModalPortal from "./ModalPortal";
const Posts = (props) => {
  const { Confirm, Alert, Accept } = props;
  const { t } = useTranslation();
  const [postsList, setPostsList] = useState([]);
  const [mainPostsList, setMainPostsList] = useState([]);
  const [searchInput,setSearchInput]=useState('');
  const [showComment,setShowComment]=useState({state:false,id:0});
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPostsList(data);
        setMainPostsList(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = async (id) => {
    await Confirm(
      "Are you sure?",
      "You won't be able to revert this!",
      "warning"
    ).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.status == 200) {
            const newPostsList = postsList.filter((post) => post.id !== id);
            console.log(newPostsList);
            setPostsList(newPostsList);
            Alert("Deleted!", "Your file has been deleted.", "success");
          } else {
            Alert("Error!", "something wrong!!", "error");
          }
        });
      }
    });
  };
  const handleSearch = (value) => {
    if(value){
    setPostsList(mainPostsList.filter((post) => post.userId == value));
    setSearchInput(value)
  }else{
    setPostsList([...mainPostsList])
    setSearchInput("")

  }
  };
  const handleShowComment=(id)=>{
    setShowComment({
      state:!showComment.state,
      id
    })
  }
  return (
    <>{showComment.state&&<ModalPortal showComment={showComment} setShowComment={setShowComment}/>}
      <h2>{t("Posts")}</h2>
      <div className="userListHeader">
        <form>
          <input
            type="text"
            name="usersListSearch"
            id="userListSearch"
            placeholder={t("search here...")}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchInput}
          />
        </form>
        <Link className="addUser" to={"/add-post"}>
          <p>+</p>
        </Link>
      </div>
      <div className="tableDiv">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t("UserId")}</th>
              <th>{t("Title")}</th>
              <th>{t("Caption")}</th>
              <th>{t("Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {postsList.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td
                  className="userId"
                  onClick={() => handleSearch(post.userId)}
                >
                  {post.userId}
                </td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <div className="actionsBtns">
                    <a onClick={() => handleDelete(post.id)}>
                      <i className="fas fa-trash"></i>
                    </a>
                    <Link to={`/add-post/${post.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <a onClick={()=>handleShowComment(post.userId)}>
                      <i className="fas fa-message"></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {postsList.length == 0 ? (
        <div className="loadingDiv">
          <div className="loadingIcon"></div>
          <p>{t("please wait")}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
const Post = WithAlert(Posts);
export default Post;
