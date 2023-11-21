import React, { useEffect, useState } from "react";

export const LiveSupportIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120.02 146.55"
      className="fill-benBlue-400 w-7 h-7 icon duration-300"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path d="M116.06,52.49c0,6.24-5.55,11.32-12.25,11.32a4.13,4.13,0,0,1-2.54,3V68a7.62,7.62,0,0,1-.93,3.93c-6.7,12.71-10.86,15-23.57,19-2.31.69-4.86,1.15-7.17,1.61C68,97.79,59.43,96.63,59.43,91.32c0-4.39,5.78-6.47,9-3.24,3.46-.92,6.93-1.39,10.17-2.31,9.93-3.24,10.16-4.16,16.64-14.33a5.31,5.31,0,0,0,.92-3.23V66.36a4.39,4.39,0,0,1-2.31-3.7c0-20.11-1.16-22,1.85-24.27A35.25,35.25,0,0,0,85.09,19.44a38.65,38.65,0,0,0-15.72-9C54.81,7.19,41.64,11.58,34,19c-5.09,4.62-8.78,12.25-10.17,19.41a4.39,4.39,0,0,1,1.85,3.47V62.43a4.9,4.9,0,0,1-5.09,4.62A4.53,4.53,0,0,1,16,63.58C9.28,63.35,3.73,58.5,3.73,52.26S9.28,40.93,16,40.93a4,4,0,0,1,2.31-2.77c-2.54-28,37-49.69,65.87-31.43a43.79,43.79,0,0,1,8.55,7.16,40.69,40.69,0,0,1,5.55,7.86,36,36,0,0,1,2.77,7.4,28.07,28.07,0,0,1,.7,8.78A4.51,4.51,0,0,1,104,40.7C110.74,41.16,116.06,46.25,116.06,52.49ZM48.34,98.71c-4.39-6-6.47-7.16-13.41-4.85-8.09,2.77-16.41,5.78-24.26,9-6.94,3-11.1,8.32-10.64,16.41.24,3.7,0,7.4,0,11.1,0,11.32,4.86,16.17,16.18,16.17H104.5c10.63,0,15.49-5.08,15.49-15.71,0-3.93-.24-7.63,0-11.56.46-7.86-3.47-13.17-10.17-16.18-7.86-3.46-15.95-6.47-24-9.24-6.47-2.08-10.4-.23-14.56,5.55-3.47,4.85-6.93,9.93-11.09,15.48C56,109.11,52,103.8,48.34,98.71ZM81.39,23.83C70.53,15.05,58.51,15.51,46,19.67,37.71,22.44,32.62,28.92,31.7,37c-1.85,15.49,1.85,30.05,13.4,41.37a21.64,21.64,0,0,0,30.05,0C85.32,68.9,88.32,56.65,89,47.17,89.25,36.08,87.63,28.92,81.39,23.83Z" />
        </g>
      </g>
    </svg>
  );
};

export const Chat = ({ message }) => {
  return (
    <div className="chat py-2 px-4 bg-benBlue-lightC2 w-fit max-w-[280px]">
      <p>{message}</p>
    </div>
  );
};

export default function LiveChat() {
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

  const toggleLiveChatOpen = () => {
    setIsLiveChatOpen(!isLiveChatOpen);
  };

  const showLiveChat = () => {
    setIsLiveChatOpen(true);
  };

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    const chatBtn = document.querySelector(".live-chat-btn");
    if (isLiveChatOpen) {
      setTimeout(() => {
        chatBox.style.display = "block";
      }, 500);

      setTimeout(() => {
        chatBtn.style.display = "none";
        chatBtn.style.animation = "";
      }, 300);

      chatBtn.style.animation = "hide-chat-btn 0.3s ease forwards";
    } else {
      chatBox.style.animation = "hide-chat-box 0.3s ease forwards";

      setTimeout(() => {
        chatBox.style.display = "none";
        chatBox.style.animation = "";
      }, 300);

      setTimeout(() => {
        chatBtn.style.display = "flex";
      }, 500);
    }
  }, [isLiveChatOpen]);

  return (
    <>
      <div className="live-chat-wrapper p-[20px] z-[11]">
        <div className="live-chat relative">
          <div className="chat-box rounded-xl overflow-hidden w-full mobile_lg:w-[400px] bg-benBlue-lightC border border-benBlue-lightC2 mb-16 mobile:mb-0">
            <div className="header flex justify-between items-center p-5 pb-0 mobile_lg:px-7 text-base mobile_lg:text-lg text-benOrange-200 font-medium">
              <p>Support Center</p>
              <svg
                onClick={toggleLiveChatOpen}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-benBlue-200 hover:fill-benBlue-100 h-8 w-8 cursor-pointer duration-300"
              >
                <path d="M12 10.586l4.293-4.293 1.414 1.414L13.414 12l4.293 4.293-1.414 1.414L12 13.414l-4.293 4.293-1.414-1.414L10.586 12 6.293 7.707l1.414-1.414L12 10.586z" />
              </svg>
            </div>
            <div className="body p-5 mobile_lg:p-7 text-sm mobile_lg:text-base text-benBlue-200 relative">
              <h3 className="font-bold text-lg mobile_lg:text-xl mb-5">
                Welcome to Benarbitrage <br />
                Support Center
              </h3>
              <div className="chat-pane flex gap-2 flex-col">
                <Chat message={"Hi, I'm here to assist."} />
                <Chat
                  message={
                    "Do you need help, support or you want to make an enquiry? I am at your service."
                  }
                />
              </div>
              <div className="popup p-4 mobile_lg:p-7 bg-benOrange-200 rounded-t-3xl text-benBlue-lightC absolute left-0 -bottom-0 w-full text-xs mobile_lg:text-sm">
                <h4 className="text-base mobile_lg:text-lg font-bold mb-2">
                  Hey there!
                </h4>
                <p>
                  Please log in to save important details in your chat history.
                  This will help us serve you better and enhance your chat
                  experience.
                </p>
                <a
                  href="/login"
                  className="text-sm mobile_lg:text-base block mt-4 w-fit text-benOrange-200 py-2 px-8 rounded-md font-medium bg-benBlue-lightC hover:bg-benBlue-lightC2 duration-300"
                >
                  Log In
                </a>
              </div>
            </div>
          </div>
          <div
            onClick={showLiveChat}
            className="live-chat-btn rounded-full w-[60px] h-[60px] bg-benOrange-400 flex justify-center items-center fixed right-5 bottom-5"
          >
            <LiveSupportIcon />
          </div>
        </div>
      </div>
    </>
  );
}
