import { useTranslation } from "react-i18next";
const Posts = () => {
  const {t}=useTranslation();  
  return (
    <>
      <h2>{t("Posts")}</h2>
    </>
  );
};
export default Posts;
