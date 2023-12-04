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
}) => {
  const navigate = useNavigate();

  if (!isModalOpen) return null;
  const closeModal = () => {
    setIsModalOpen(false);
    navigate(modalAfterPath);
  };
  const requestURL = () => {
    axios
      .get(requestAxios)
      .then((response) => {
        setIsModalOpen(false);
        navigate(modalAfterPath);
        console.log("게시글 삭제 성공:", response.data);
      })
      .catch((error) => {
        console.error("게시글 삭제 실패:", error);
      });
  };

  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.modal_wrap} onClick={(e) => e.stopPropagation()}>
        <p className={styles.modal_content}>{modalContent}</p>
        <span className={styles.modal_btn} onClick={requestURL}>
          확인
        </span>
        <span className={styles.modal_btn} onClick={closeModal}>
          취소
        </span>
      </div>
    </div>
  );
}; // Modal

// 모달을 사용하게 위해 props로 전달해 주어야 하는 것.
Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalContent: PropTypes.string.isRequired,
  modalAfterPath: PropTypes.string,
};

export default Modal;
