import { useTranslation } from "react-i18next";
const ToDo = () => {
  const {t}=useTranslation();
  return (
    <>
      <h2>{t("ToDo")}</h2>
    </>
  );
};
export default ToDo;
