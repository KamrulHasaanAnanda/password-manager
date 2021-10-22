import { React, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = ()=>{
    const {signup,currentUser} = useAuth();
// console.log(`signup`, signup);
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
                name: '',
                password: '',
                confirm_password:'',
                email: '',
        });
        const [error, setError] = useState("");

        const handleChange = (e)=>{
            let target = e.target;
            const name = target.name;
            let value = target.value;
            setState({
                [name]:value
            })
        }

        const handleSubmit = async(e)=>{
            e.preventDefault();
            console.log(`state.password`, state.password)
            if(state.password !== state.confirm_password){
                setError("Passwords don't match");
            }else{

                try{
                    console.log(`state.email`, state.email)
                    await signup(state.email,state.password);
                    setError("Your account created");
                }catch{
                    setError("Failed to create a account");
                }
            }
        }

        let errorMessage = "";
        if(error){
            errorMessage = <div className="">
                                <h3 className="border-0 bg-red-500 rounded-md mt-2 p-3 text-bold">
                                    {error}
                                </h3>
                            </div>
        }
        
    return(
        <div className="container mx-auto mt-4">
            <div className="relative w-6/12 border-0 bg-blue-200 rounded-md inline-grid mt-12 p-8">
                {/* {currentUser} */}
                <h3 className="absolute -top-4 rounded-md bg-red-300 p-3 left-2">Login Now</h3>
               {errorMessage} 
               <form className="grid" onSubmit={handleSubmit}>
                <input className="h-12 rounded-md my-4 text-center" onChange={handleChange} value={state.email}  type="text" name="email" placeholder="Enter Email"/>
                <input className="h-12 rounded-md my-4 text-center" onChange={handleChange} value={state.password}  type="password" name="password" placeholder="Enter Password"/>
                <button className="w-24 rounded-md bg-yellow-400 text-blue-900 font-bold ml-auto p-4" type="submit">Submit</button>
              </form>
                <h4 className="my-4 text-center">Don't have an account? <button className="w-24 rounded-md bg-blue-400 text-black-900 font-bold ml-auto p-2"><Link to="/">Sign in</Link></button></h4>
            </div>


        </div>
    )
}

export default Login;