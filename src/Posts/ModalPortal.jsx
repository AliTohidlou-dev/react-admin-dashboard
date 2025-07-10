import { t } from "i18next";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = (props) => {
  const { showComment, setShowComment } = props;
  const [commentsList, setCommentsList] = useState([]);
  const userId = showComment?.id;
  useEffect(() => {
    if (!userId) return;
    console.log(userId);
    
    fetch(`https://jsonplaceholder.typicode.com/posts/${userId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setCommentsList(data);
      })
      .catch((err) => console.error("خطا در گرفتن کامنت‌ها:", err));
  }, [userId]); 
      console.log(commentsList);
      
return createPortal(
    <div className="modalBox">
        <div className="closeModalBtn" onClick={()=>setShowComment({state:false,id:""})}>
          <i className="fas fa-close"></i>
        </div>
        <div className="comments">
          {Array.isArray(commentsList) ? commentsList.map((comment)=>(
          <div className="comment" key={comment.id}>
            <p>{comment.email}</p>
            <span>{comment.body}</span>
          </div>
          )):
          <div className="loadingDiv" style={{marginTop:"100px"}}>
          <div className="loadingIcon" style={{borderColor:"white"}}></div>
          <p style={{color:"white"}}>{t("please wait")}</p>
        </div>
          }
      </div>
    </div>,
    document.getElementById("modalPortal")
  );
};
export default ModalPortal;
