import httpService from "./httpService";
import { setCommonHeader } from "./httpService";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "tokenkey";
setTokenHeader();

export function getJWT(){
    return localStorage.getItem(TOKEN_KEY);
}

export function setTokenHeader(){
    setCommonHeader('x-auth-token',getJWT());
}

export function createUser(user) {
    return  httpService.post('/users',user);
};

export async function loginUser(credentials) {
    const {data} = await httpService.post("/auth",credentials);
    console.log('DATA TOKEN:',data.token);
    
    // בהצלחה סטטוס 200 מקבלים את האובייקט ריספונס בלבד שמכיל בתוכו את הפרופרטי דאטה
    // בכישלון מקבלים אובייקט אחר שאחד הפרופרטי שלו הוא ריספונס
    localStorage.setItem(TOKEN_KEY, data.token);
    setTokenHeader();
//   אנחנו צריכים לגרום שעם כל בקשה ישלח התוקן הזה לשרת כפי שהשרת דורש ממני לשלוח אותו
// במקרה הזה השרת דורש לשלוח אותו בתור הדר בשם XO TOKEN
}

export function logOut(){
    localStorage.removeItem(TOKEN_KEY);
    setTokenHeader();
}

export function getUser(){
    try {
        const token = getJWT();
        console.log('jwt decode token:',jwtDecode(token));
        return jwtDecode(token);
    } catch {
        return null;
    }
};

const usersService = {
    createUser,
    loginUser,
    logOut,
    getJWT, 
    getUser,
};

export default usersService;

// createUser({
//     name: 'mika',
//     password: '1234567',
//     email: 'mik1@gmail.com',
//     biz: false,
// }).then(console.log);