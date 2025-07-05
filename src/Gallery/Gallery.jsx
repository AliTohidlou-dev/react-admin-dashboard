import { useTranslation } from "react-i18next";
const Gallery = () => {
  const {t}=useTranslation();
  return (
    <>
      <h2>{t("Gallery")}</h2>
    </>
  );
};
export default Gallery;
