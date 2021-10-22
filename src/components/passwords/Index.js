import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { React, useEffect, useReducer } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase-config";
import AddPassword from "./AddPassword";
import Update from "./Update";



const Index = ()=>{
// console.log(`signup`, signup);
const userCollectionRef = collection(db, "passwords");
const {currentUser,logout} = useAuth();
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
                name: '',
                password: '',
                confirm_password:'',
                email: '',
                addPassword:false,
                passwords:"",
                updateData:"",
                deleteMessage:false,
        });

        let sendUpdateData = (data)=>{
            setState({updateData:data})
            getPasswords();
        }

        const deleteUser = async(id)=>{
            const passwordDoc = doc(db, "passwords",id);
            await deleteDoc(passwordDoc);
            setState({deleteMessage:true})
            getPasswords();
          }

        useEffect(()=>{
            getPasswords();
          }, [])
        
          const getPasswords = async ()=>{
            const data = await getDocs(userCollectionRef);
            
            // console.log(`data`, data.docs[0])
            setState({
                passwords:data.docs.map((doc)=>({...doc.data(), id:doc.id}))
            
            });
        }
    const changeAddPassword = (data)=>{
        setState({addPassword:data})
    } 

    const showPassword = (value,id)=>{
       document.getElementById(`password`+id).innerHTML = value;
    }
    const hidePassword = (id)=>{
       document.getElementById(`password`+id).innerHTML = "Hover to show password";

    }
    

    let tableData = ""
    if(state.passwords && !state.addPassword && !state.updateData){
        let passwordValue = state.passwords.filter(pass=> pass.user_id === currentUser.uid);
        console.log(`passwordValue`, passwordValue)
        
        tableData = passwordValue.map(
            password=>{
                // console.log(`password`, password)
                // console.log(password.password.length)
                let changedPass = "Hover to show password";
                return(
                <tr key={password.id} className="border-2 rounded border-red-400">
                    <td>{password.name}</td>
                    <td className="cursor-pointer" id={`password`+password.id} onMouseOver={()=>showPassword(password.password,password.id)} onMouseLeave={()=>hidePassword(password.id)}>
                    {changedPass}
                    </td>
                    <td>
                    <button className="bg-blue-500 mr-2 hover:bg-blue-200 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={()=>sendUpdateData(password)}>Update</button>
                    <button className="bg-red-500 hover:bg-red-200 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={()=>deleteUser(password.id)} >Delete</button>
                    </td>
                </tr>
                )
            }
        )
    }
    return(
        <div className="container w-full h-full mx-auto  mt-4">
            <h3 className="font-bold text-lg">Password Manager(<span className="font-light text-xs">Manage your passwords</span>)</h3>
            <div className="flex flex-row">
                <h3 className="border-0 bg-blue-300 rounded-md p-4 font-bold cursor-pointer" onClick={()=>setState({
                    addPassword:!state.addPassword
                })}>Add Password</h3>
                <h3 className="border-0 bg-red-700 rounded-md p-4 font-bold ml-auto cursor-pointer" onClick={async()=>{
                    await logout();
                }}>
                    Log Out
                </h3>
            </div>
            <div>
                {state.addPassword ? 
                <div>
                    <AddPassword getPassword={getPasswords} changeAddPassword={changeAddPassword}/>
                </div> :
                ""
            }
            </div>
            {
                state.deleteMessage?

            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Password Deleted!</strong>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>setState({deleteMessage:false})}>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title >Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
             </div>:""
            }
            {
                state.updateData? 

                <Update sendUpdateData={sendUpdateData} updateData={state.updateData}/>
                :
            <div className="mt-5 overflow-y-scroll-auto h-96">
                <table className="border-2 rounded border-red-400" width="100%">
                    <tr className="border-2 rounded border-red-400">
                        <th>
                            Password name
                        </th>
                        <th>
                            Password
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                   {tableData}
                </table>
            </div>
            }
        </div>
    )
}

export default Index;