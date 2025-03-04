export function checkPermission(user, designation) {
    if(user.designation) {
        return user.designation.map(d => d.designation.name).includes(designation)
    }
}

export function checkLevel(user, level) {
    if(user?.level) {
        return user.level === level
    }
}