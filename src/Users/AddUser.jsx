import { Outlet, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Swal from "sweetalert2";
const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  if (id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const firstname = data.name.split(" ")[0];
        const lastname = data.name.split(" ")[1];
        const email = data.email;
        const username = data.username;
        setData({...data,firstname,lastname,email,username})
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleForm = (e) => {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/users/", {
      method: "POST",
      headers: {
        "content-type": "appliction/json",
      },
      body: data,
    }).then((res) => {
      if (res.status == 201) {
        Swal.fire({
          title: !id ? t("Added!"):t("Edited!"),
          text: !id ?t("Your user has been added."):t("Your user has been edited."),
          icon: "success",
          confirmButtonColor: "green",
          confirmButtonText: t("ok"),
        })
          .then(() => {
            navigate("/users");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <>
      <h2>{id ? t("Edite User") : t("Add User")}</h2>
      <form className="addUserForm" onSubmit={handleForm}>
        <label htmlFor="firstname">{t("firstname")}:</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          onChange={(e) => setData({ ...data, firstname: e.target.value })}
          value={data.firstname}
        />
        <label htmlFor="lastname">{t("lastname")}:</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          onChange={(e) => setData({ ...data, lastname: e.target.value })}
          value={data.lastname}
        />
        <label htmlFor="email">{t("email")}:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
        />
        <label htmlFor="username">{t("username")}:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          value={data.username}
        />
        <label htmlFor="password">{t("password")}:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">{id ? t("EDIT") : t("SUBMIT")}</button>
      </form>
      <Outlet />
    </>
  );
};
export default AddUser;
