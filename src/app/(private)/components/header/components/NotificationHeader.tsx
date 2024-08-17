import { Badge } from "antd";
import { Bell } from "iconoir-react";

const NotificationHeader = () => {
  return (
    <Badge className="cursor-pointer" count={100}>
      <Bell width={20} height={20} />
    </Badge>
  );
};

export default NotificationHeader;
