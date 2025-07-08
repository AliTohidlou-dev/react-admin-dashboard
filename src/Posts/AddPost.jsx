import { Outlet, useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const AddPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState({
    title: "",
    caption: "",
  });
  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          
          const title = data.title;
          const caption = data.body;
          
          setData({ ...data, title, caption});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);
  const handleForm = (e) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/posts/${id || ""}`, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if ((res.status === 201 && !id) || (res.status === 200 && id)) {
          Swal.fire({
            title: !id ? t("Added!") : t("Edited!"),
            text: !id
              ? t("Your user has been added.")
              : t("Your user has been edited."),
            icon: "success",
            confirmButtonColor: "green",
            confirmButtonText: t("ok"),
          }).then(() => {
            navigate("/posts");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: t("Oops..."),
            text: t("Something went wrong!"),
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: t("Oops..."),
          text: t("Request failed!"),
        });
      });
  };
  return (
    <>
      <h2>{id ? t("Edite Post") : t("Add Post")}</h2>
      <form className="addUserForm" onSubmit={handleForm}>
        <label htmlFor="title">{t("Title")}:</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setData({ ...data, title: e.target.value })}
          value={data.title}
        />
        <label htmlFor="caption">{t("Caption")}:</label>
        <textarea
          type="text"
          name="caption"
          id="caption"
          onChange={(e) => setData({ ...data, caption: e.target.value })}
          value={data.caption}
        />
        <button type="submit">{id ? t("EDIT") : t("SUBMIT")}</button>
      </form>
      <Outlet />
    </>
  );
};
export default AddPost;
