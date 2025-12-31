import { useSelector } from "react-redux";
const MessageInformation = () => {
  const MessageSelector = useSelector((state) => state.message);

  if (!MessageSelector) {
    return null;
  }
  return (
    <div>
      <span className="infoMessage">{MessageSelector}</span>
    </div>
  );
};

export default MessageInformation;
