import { t } from "i18next";
import Swal from "sweetalert2";

const WithAlert = (MainComponent) => {
  if (!MainComponent) {
    console.log("Heigher component should be have child");
    return () => null;
  }
  const NewComponent = (props) => {
    const Confirm = (title, text, icon) => {
      const result = Swal.fire({
        title: t(title),
        text: t(text),
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: t("Yes, delete it!"),
        cancelButtonText: t("Cancel"),
      });
      return result;
    };
    const Alert = (title, text, icon) => {
      const result=Swal.fire({
        title: t(title),
        text: t(text),
        icon: icon,
        confirmButtonColor: "green",
        confirmButtonText: t("ok"),
      });
      return result;
    };
    return <MainComponent {...props} Confirm={Confirm} Alert={Alert}/>;
  };
  return NewComponent;
};
export default WithAlert;
