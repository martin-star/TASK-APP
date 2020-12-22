import React from 'react'

export const TaskBanner = (props) => {
    return (
        <h4 className="bg-primary text-center text-white p-4" >
       {props.userName} Task App ({props.taskItem.filter(t => !t.done).length} tasks for done)
        </h4>
    )
}
