// import { useSelector } from "react-redux"

import { useContext } from "react";
import { checkPermission } from "./PermissionFunctions";
import { AuthContext } from "@antopolis/admin-component-library/dist/contexts";

// const contentManager = checkPermission(employee, 'Content Manager')
// const attendanceExecutive = checkPermission(employee, 'Attendance Executive')

function usePermissions() {
  const { member } = useContext(AuthContext);

  const levels = {
    contentManager: checkPermission(member, "Content Manager"),
    attendanceExecutive: checkPermission(member, "Attendance Executive"),
  };

  return levels;
}

export default usePermissions;
