export const fetchUser = () =>{
    const userInfo = localStorage.signedInUser != null ? localStorage.signedInUser : localStorage.clear();
    return userInfo;
}