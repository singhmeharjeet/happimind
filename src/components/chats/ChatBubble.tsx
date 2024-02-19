import { HTMLAttributes } from "react";

interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  isSender: boolean;
  time: string;
}

function ChatBubble({ isSender, children, time }: ChatBubbleProps) {
  const bubbleClasses = isSender
    ? "bg-primary text-white "
    : "bg-gray-200 text-gray-700";

  return (
    <div
      className={`@container m-4 flex items-center ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      {/* <div className="@xl:block hidden">
        {!isSender
          ? avatar
          : session?.user.image && (
              <ImageWithFallback
                fill
                src={session?.user?.image}
                alt="userImage"
              />
            )}
      </div> */}
      <div className="@sm:m-2 @xl:m-1 @xl:max-w-[80%] relative ml-2 max-w-full">
        {/* {!isSender && (
          <p className="@xl:pt-2 absolute bottom-full text-sm text-gray-400 ">
            {name}
          </p>
        )} */}
        <p
          className={`h-auto w-full overflow-hidden break-words rounded-[1rem] px-4 py-2 ${bubbleClasses}`}
        >
          {children as string}
        </p>
        {/* Chat Bubble Tail */}
        <svg
          className={`absolute bottom-0 h-4 w-4 scale-125 ${
            isSender ? "-right-1 -scale-x-100" : "-left-1"
          }`}
          viewBox="32.484 17.5 15.515 17.5"
        >
          <path
            d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
            className={isSender ? "fill-primary" : "fill-gray-200"}
          />
        </svg>
      </div>
    </div>
  );
}
export default ChatBubble;
