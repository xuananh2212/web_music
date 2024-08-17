import NotificationHeader from "./NotificationHeader";
import UserSidebar from "./UserSidebar";

const ActionHeader = () => {
  return (
    <div className="flex gap-6 items-center justify-end">
      <NotificationHeader />
      <UserSidebar />
    </div>
  );
};

export default ActionHeader;
