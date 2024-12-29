export function getUserData()
{
    const localUserData = window.localStorage.getItem("userData");
    const {token, userId, isAdmin} = localUserData ? JSON.parse(localUserData) : {};
    
    return {
        token: token ?? "",
        userId: userId ?? "",
        isAdmin: isAdmin ?? false,
    };
};

export function setUserData(userData)
{
    window.localStorage.setItem("userData", JSON.stringify(userData));
};

export function removeUserData()
{
    window.localStorage.removeItem("userData");
};