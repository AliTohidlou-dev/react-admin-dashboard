import { useTranslation } from "react-i18next";

const Lang=()=>{
  const {i18n:{changeLanguage ,language}}=useTranslation();
  const changeLocale=(e)=>{
    const {value}=e.target;
    changeLanguage(value);
  }
  return(
    <>
    <select className="lang" onChange={changeLocale} value={language}>
      <option value="en">🇺🇸en</option>
      <option value="fa">🇮🇷fa</option>
    </select>
    </>
  )
}

export default Lang;