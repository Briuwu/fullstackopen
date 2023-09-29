const Notification = ({ message, type }) => {
  if (message === null && type === null) {
    return null;
  }

  return <div className={`notification ${type}`}>{message}</div>;
};
export default Notification;
