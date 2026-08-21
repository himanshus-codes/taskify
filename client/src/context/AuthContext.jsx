import { useState,useEffect, createContext, useContext,  } from 'react';
import { getUser } from '../services/userService'

export const AuthContext = createContext()

function AuthProvider({children}){

    const [auth, setAuth] = useState({
        user:null, 
        token:null
    })

    // console.log(auth)

    //  runs once when AuthProvider mounts.
    // useful in case of page refreshes for reattaining auth token in state and getting back user
    useEffect(() => {
        async function getCurrentUser() {
            const token = localStorage.getItem("token");
            // console.log("getCurrentUser", token)
            if (!token) return;
    
            try{
                let res = await getUser(token)
                console.log("getCurrentUser", res)
                
                setAuth({
                    token,
                    user: res.data
                });

            }catch(err){
                // localStorage.removeItem("token");
                // setAuth({ token: null, user: null });

            }
        }

        getCurrentUser();
          
    }, []);

    // console.log(auth.user)

    const setloginContext = async (token) => {
        localStorage.setItem("token", token);

        // imp changes: 
        // insure not all userdata comes,, password though encoded should not be retrieved
        // insure error handling block (signin parent already has)


        let res = await getUser(token)
        // console.log(res)
        setAuth({
            token,
            user:res.data
        });

        
    };

    const setlogoutContext = () => {
        localStorage.removeItem("token");

        setAuth({
            token: null,
            user: null
        });
    };


  return <AuthContext.Provider value={{token: auth.token, user:auth.user, setloginContext, setlogoutContext}}>
      {children}
  </AuthContext.Provider>
}

export default AuthProvider

// or 
// (Better)

export const useAuth = () => {
    return useContext(AuthContext);
};