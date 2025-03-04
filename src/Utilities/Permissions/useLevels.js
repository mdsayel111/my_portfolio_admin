// import { useSelector } from "react-redux"

import { AuthContext } from "@antopolis/admin-component-library/dist/contexts"
import { useContext } from "react"
import { checkLevel } from "./PermissionFunctions"


// export const admin = checkLevel(employee, 'admin')
// export const superAdmin = checkLevel(employee, 'superAdmin')
// export const member = checkLevel(employee, 'employee')

function useLevels() {
    const {member} = useContext(AuthContext)

    const levels = {
        branchManager: checkLevel(member, 'branchManager'),
        owner: checkLevel(member, 'owner'),
        superAdmin: checkLevel(member, 'superAdmin'),
        member: checkLevel(member, 'employee')
    }

    return levels
}

export default useLevels