import React from 'react'

export const TableRows = (props) => {
    return (
        <tr key={props.task.name}>
            <td>{props.task.name}</td>
            <td>
                <input type="checkbox" checked={props.task.done} onChange= {()=> props.toggleTaskItem(props.task)}/>
            </td>
        </tr>
    )
}

