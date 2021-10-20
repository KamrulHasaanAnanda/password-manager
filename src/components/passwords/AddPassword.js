import { addDoc, collection } from "firebase/firestore";
import { React, useReducer, useState } from "react";
import { db } from "../../firebase-config";


const AddPassword = (props)=>{

  const userCollectionRef = collection(db, "passwords");
  
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
                name: '',
                password: '',
                confirm_password:'',
                addMessage:false,
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

        const createUser = async(e)=>{
            e.preventDefault();
           
            const add = await addDoc(userCollectionRef,{name:state.name, password:state.password ,user_id:"1"});
            console.log(`add`, add)
            if(add){
                setState({addMessage:true})
            }
          }
        
        
    return(
        <div className="container  mt-4">
            {
                state.addMessage ?
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Password Added!</strong>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>props.changeAddPassword(false)}>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
                :""
            }
            <div className="relative w-6/12 border-0 bg-blue-200 rounded-md inline-grid mt-12 p-8">
                {/* {currentUser} */}
                <h3 className="absolute -top-4 rounded-md bg-red-300 p-3 left-2">Add Password</h3>
               {/* {errorMessage}  */}
               <form className="grid" onSubmit={createUser}>
                <input className="h-12 rounded-md my-4 text-center" onChange={handleChange} value={state.name} type="text" name="name" placeholder="Enter Password Name"/>
              
                <input className="h-12 rounded-md my-4 text-center" onChange={handleChange} value={state.password}  type="password" name="password" placeholder="Enter Password"/>
                <input className="h-12 rounded-md my-4 text-center" onChange={handleChange} value={state.confirm_password} type="password" name="confirm_password"  placeholder="Enter Password Confirmation"/>

                <button className="w-24 rounded-md bg-yellow-400 text-blue-900 font-bold ml-auto p-4" type="submit">Submit</button>
              </form>
            </div>


        </div>
    )
}

export default AddPassword;