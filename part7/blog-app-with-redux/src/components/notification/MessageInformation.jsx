import { useSelector } from 'react-redux';
import Style from '../../components/notification/Notification.module.css';
const MessageInformation = () => {
  const MessageSelector = useSelector((state) => state.message);

  if (!MessageSelector) {
    return null;
  }
  return <span className={Style['infoMessage']}>{MessageSelector}</span>;
};

export default MessageInformation;
