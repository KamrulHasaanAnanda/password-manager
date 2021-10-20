import { collection, doc, updateDoc } from "firebase/firestore";
import { React, useReducer } from "react";
import { db } from "../../firebase-config";


const Update = (props)=>{

  const userCollectionRef = collection(db, "passwords");
  
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
                name: props.updateData.name,
                password: props.updateData.password,
                updateMessage:false,
        });
        console.log(`props.updateData`, props.updateData)
        const handleChange = (e)=>{
            let target = e.target;
            const name = target.name;
            let value = target.value;
            setState({
                [name]:value
            })
        }

        const update = async(e)=>{
            // console.log(`e`, e)
            e.preventDefault();
             const userDoc = doc(db,"passwords",props.updateData.id);
             const newFields = {name:state.name,password:state.password}
             await updateDoc(userDoc,newFields);
             setState({updateMessage:true})
             
          }
          
        
    return(
        <div className="container  mt-4">
            <div className="relative w-6/12 border-0 bg-blue-200 rounded-md inline-grid mt-12 p-8">      
                {
                state.updateMessage ?
                <h3 className="absolute -top-4 rounded-md bg-red-500 p-3 left-2">Updated</h3> :
                <h3 className="absolute -top-4 rounded-md bg-red-300 p-3 left-2">Update Password</h3>
                }
                
               <form className="grid" onSubmit={update}>
                    <input className="h-12 rounded-md my-4 text-center" onChange={handleChange} value={state.name} type="text" name="name" placeholder="Enter Password Name"/>
                    <input className="h-12 rounded-md my-4 text-center" onChange={handleChange} value={state.password} type="password" name="password" placeholder="Enter Password"/>
                    <div className="flex">
                        <h3 className="w-24 rounded-md bg-red-400 text-blue-900 font-bold ml-auto p-4 cursor-pointer" onClick={()=>props.sendUpdateData(false)}>Close</h3>
                        <button className="w-24 rounded-md bg-yellow-400 text-blue-900 font-bold ml-auto p-4" type="submit">Submit</button>
                    </div>
              </form>
         </div>
    </div>
    )
}

export default Update;