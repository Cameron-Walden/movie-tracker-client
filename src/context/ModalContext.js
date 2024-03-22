import { createContext, useState } from "react";
export const ModalContext = createContext();

export default function ModalProvider(props) {
  const [openModal, setOpenModal] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [date, setDate] = useState("");

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        starRating,
        setStarRating,
        userReview,
        setUserReview,
        date,
        setDate,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}
