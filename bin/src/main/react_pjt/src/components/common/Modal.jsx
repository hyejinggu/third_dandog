import styles from "../../css/common/modal.module.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Modal = ({
  isModalOpen,
  modalContent,
  setIsModalOpen,
  modalAfterPath,
  requestAxios,
  requestMethod,
  dataToRequest,
  requestFunction,
}) => {
  const navigate = useNavigate();

  if (!isModalOpen) return null;

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(modalAfterPath);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const requestGet = () => {
    axios
      .get(requestAxios)
      .then((response) => {
        setIsModalOpen(false);
        if (requestFunction != null) {
          requestFunction();
        }
        navigate(modalAfterPath);
        console.log("요청 성공:", response.data);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  };

  const requestPost = () => {
    axios
      .post(requestAxios, dataToRequest, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        // alert(`response.data : ${response.data}`);
        navigate("/community");
      })
      .catch((err) => {
        console.error("요청 실패:", err);
      });
  };

  return (
    <div className={styles.modal} onClick={cancelModal}>
      <div className={styles.modal_wrap} onClick={(e) => e.stopPropagation()}>
        <p className={styles.modal_content}>{modalContent}</p>
        <div className={requestAxios == null ? "" : styles.modal_btn_wrap}>
          {requestAxios == null ? ( // requestAxios(보낼 요청 값) 없으면 기존 모달처럼 확인 버튼만 뜸
            <span className={styles.modal_btn} onClick={closeModal}>
              확인
            </span>
          ) : requestMethod === "post" ? ( // requestMethod 방식에 따라 확인 버튼의 onClick 함수 달라짐
            <span className={styles.modal_btn} onClick={requestPost}>
              확인
            </span>
          ) : (
            <span className={styles.modal_btn} onClick={requestGet}>
              확인get
            </span>
          )}
          {requestAxios == null ? (
            ""
          ) : (
            <span className={styles.modal_btn} onClick={cancelModal}>
              취소
            </span>
          )}
        </div>
      </div>
    </div>
  );
}; // Modal

// 모달을 사용 위해 props로 전달해 주어야 하는 것.
Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalContent: PropTypes.string.isRequired,
  modalAfterPath: PropTypes.string,
};

export default Modal;
