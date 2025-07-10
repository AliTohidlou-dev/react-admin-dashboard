import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import WithAlert from "../HOC/withAlert";

const UsersList = (porps) => {
  const { Confirm, Alert, Accept} = porps;
  const { t } = useTranslation();
  const [usersList, setUsersList] = useState([]);
  const [mainUsersList, setMainUsersList] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsersList(data);
        setMainUsersList(data);
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
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.status == 200) {
            const newUserList = usersList.filter((user) => user.id !== id);
            console.log(newUserList);
            setUsersList(newUserList);
            Alert("Deleted!","Your file has been deleted.","success")
          } else {
            Alert("Error!","something wrong!!","error")
          }
        });
      }
    });
  };
  const handleSearch = (e) => {
    setUsersList(
      mainUsersList.filter((user) => user.name.includes(e.target.value))
    );
  };
  return (
    <>
      <h2>{t("Users list")}</h2>
      <div className="userListHeader">
        <form>
          <input
            type="text"
            name="usersListSearch"
            id="userListSearch"
            placeholder={t("search here...")}
            onChange={handleSearch}
          />
        </form>
        <Link className="addUser" to={"/add-user"}>
          <p>+</p>
        </Link>
      </div>
      <div className="tableDiv">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t("Name")}</th>
              <th>{t("Username")}</th>
              <th>{t("Email")}</th>
              <th>{t("Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div className="actionsBtns">
                    <a onClick={() => handleDelete(user.id)}>
                      <i className="fas fa-trash"></i>
                    </a>
                    <Link to={`/add-user/${user.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {usersList.length == 0 ? (
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
const UserList=WithAlert(UsersList)
export default UserList;
