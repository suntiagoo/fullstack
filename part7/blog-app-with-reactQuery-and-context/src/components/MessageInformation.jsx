const MessageInformation = ({ notification }) => {
  if (!notification) {
    return null;
  }
  return (
    <div>
      <span className="infoMessage">{notification}</span>
    </div>
  );
};

export default MessageInformation;
