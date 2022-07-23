import React, { useContext } from "react";
import { AppContext } from "../App";

const Modal = () => {
  const { handleModal } = useContext(AppContext);
  return (
    <div className="background__modal" onClick={handleModal}>
      <h1>Not A Word (Click Me)</h1>
    </div>
  );
};

export default Modal;
