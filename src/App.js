import React, { useState,useEffect } from 'react';
import './App.css';
import {TableRows} from './components/TableRows'
import {TaskBanner} from './components/TaskBanner'
import {TaskCreator} from './components/TaskCreator'
import {VisibilityControl} from './components/VisibilityControl'

function App() {

  const [userName, setUserName] = useState("Your");
  const [taskItem, setTaskItem] = useState([
    { name: "Task 1", done: false },
    { name: "Task 2", done: false },
    { name: "Task 3", done: true },
    { name: "Task 4", done: false }
  ]);

  const[showCompleted, setShowCompleted]= useState(true) 

useEffect(()=>{
let data = localStorage.getItem("tasks")
if (data !=null){
  setTaskItem(JSON.parse(data));
} else{
  setTaskItem([
    { name: "Task 1 example", done: false },
    { name: "Task 2 example", done: false },
    { name: "Task 3 example", done: true },
    { name: "Task 4 example", done: false }

  ])
  setShowCompleted(true);
}
}, [])

useEffect(()=>{
 localStorage.setItem("tasks", JSON.stringify(taskItem));
}, [taskItem])

  const createNewTask = taskname =>{
    if (!taskItem.find(t => t.name === taskname )) {
      setTaskItem([...taskItem, {name: taskname, done: false}])
    }
  }


  const toggleTaskItem = task => 
    setTaskItem(taskItem.map(t => (t.name === task.name ? {...t, done: !t.done} : t )))
  


  const taskTableRows = (doneValue) => 
     taskItem
     .filter(task => task.done === doneValue)
     .map(task => (
      <TableRows task={task} key={task.name} toggleTaskItem = {toggleTaskItem}/>
      
    ))
  

  return (
    <div className="App">
      <TaskBanner userName={userName} taskItem={taskItem}/>
      <TaskCreator callback={createNewTask}/>
      <table className="table table-striped table-bordered">
        <tr>
          <th>Description</th>
          <th>Done</th>
        </tr>
      
      <tbody>
        {taskTableRows(false)}
      </tbody>
      </table>
 <div className="bg-secondary-text-white text-center p2 ">
   <VisibilityControl
    description="Completed task"
    isChecked={showCompleted}
    callback={ cheked => setShowCompleted(cheked)}
   />
 </div>
 { 
 showCompleted === true &&(
   <table className="table table-striped table-bordered">
     <thead>
     <tr>
       <th>Description</th>
       <th>Done</th>
     </tr>
     </thead>
     <tbody>
       {taskTableRows(true)}
     </tbody>
   </table>
 )
 }


    </div>
  );
}

export default App;
