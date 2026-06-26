import { useState, useEffect } from "react"


export default function AddNewTodoButton({isAddTodoFormVisible, setAddTodoFormVisible}){

    // const [messageVisible, setMessageVisible] = useState(false) // display message/ button purpose when mouse hovers

    function toggleForm(){
        setAddTodoFormVisible(curr => !curr)
        console.log("Add todo from visible:", isAddTodoFormVisible)
    }

    function displayMessage(){
        setMessageVisible(curr => !curr)
    }
    useEffect(() => {
    console.log("AddNewTodoButton mounted");

    return () => {
        console.log("AddNewTodoButton unmounted");
    };
}, []);

    return<>
            {/* {messageVisible? <div>...</div> : null} */}
            <div id="addBtnDiv" >
                <button id="addBtn"  onClick={toggleForm} style={isAddTodoFormVisible ? {backgroundColor:"red"} :{}}> {isAddTodoFormVisible? "Cancel & Close" : "+ Create New"} </button>
            </div>
    </>
}