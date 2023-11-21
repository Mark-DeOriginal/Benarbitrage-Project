import React, { useEffect } from "react";
import Modal from "../../Modal";
import { ErrorIcon as CloseIcon } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsBuyAssetModalOpen } from "../../../redux-states/uiSlice";
import LoadingSpinner from "../../LoadingSpinner";
import { createPortal } from "react-dom";

export default function AssetPurchaseModal() {
  const isBuyAssetModalOpen = useSelector(
    (state) => state.ui.isBuyAssetModalOpen
  );

  useEffect(() => {
    const modalBg = document.querySelector(".modal-bg");
    const modalContent = document.querySelector(".modal-content");
    const loadingSpinner = document.querySelector(".loader-wrapper");

    if (modalBg && modalContent) {
      if (isBuyAssetModalOpen) {
        modalBg.style.display = "block";
        loadingSpinner.style.display = "block";

        setTimeout(() => {
          loadingSpinner.style.display = "none";
          modalContent.style.display = "block";
        }, 3000);
      } else {
        modalContent.style.animation = "0.3s ease forwards hide-modal-content";

        modalBg.style.animation = "0.3s ease 0.6s forwards hide-modal-bg";
        setTimeout(() => {
          modalContent.style.display = "none";
          modalContent.style.animation = "";

          modalBg.style.display = "none";
          modalBg.style.animation = "";
        }, 900);
      }
    }
  }, [isBuyAssetModalOpen]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setIsBuyAssetModalOpen(false));
  };

  return (
    <>
      <Modal className={`buy-asset-modal pt-4`}>
        <div className="modal-header flex justify-between px-4 py-5 bg-benWhitishBlue dark:bg-[#413f6e] border-b border-navBarBorderLight dark:border-navBarBorderDark">
          <h1 className="font-bold text-lg tablet:text-xl">Asset Purchase</h1>
          <button onClick={closeModal} className="close-btn">
            <CloseIcon className="h-auto w-4 fill-benBlue-lightE dark:fill-benBlue-300" />
          </button>
        </div>
        <div className="modal-body bg-benWhite dark:bg-benBlue-400">
          <p>Modal text</p>
          <p>Modal text</p>
          <p>Modal text</p>
          <p>Modal text</p>
          <p>Modal text</p>
          <p>Modal text</p>
          <p>Modal text</p>
          <p>Modal text</p>
        </div>
        {createPortal(
          <div
            style={{ display: "none" }}
            className={`loader-wrapper fixed top-[200px] left-[50%] translate-x-[-50%] z-[15]`}
          >
            <LoadingSpinner color={`#8585af`} />
          </div>,
          document.body
        )}
      </Modal>
    </>
  );
}
