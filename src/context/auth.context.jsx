//מעיין סטייט גלובלי שכל אחד יכול לקבל אותו תחתיו
// מנגנון שמאפשר לי לעטוף אלמנטים ושיהיו נגישים

import { useContext, useState } from "react";
import { createContext } from "react";
import usersService, { getUser, loginUser } from "../services/usersService";

const authContext = createContext(null);//יוצר פרוביידר וקונסיומר ספק וצרכן
// במקרה שמישהו ינסה לבקש מהקונטקסט פרטים והוא לא נמצא תחת הפרוביידר הוא יקבל את הערך הדיפולטיבי ששמנו בסוגריים כלומר נאל
authContext.displayName = 'auth-context-namerotem' //react tools

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUser());

    const refreshUser = () => setUser(getUser());

    const login = async (credential) => {
        const response = await loginUser(credential);
        refreshUser();

        return response;
    };

    const logOut = () => {
        usersService.logOut();
        refreshUser();
    }
//  פרוביידר באמצעותו נגדיר מה הערכים שמסופקים
// קונסיומר שאפשר לעשות את זה עם יוז קונטקסט כמו שעשינו מגדיר את הערכים שסופקו 
    return (
        <authContext.Provider value={{ user, login, logOut, createUser: usersService.createUser }}
        >
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(authContext);//יוז קונטקסט זה הוק של  ריאקט שמקבל אובייקט קונטקסט ומחזיר את הואליו שסופק לפרוביידר שלו
};