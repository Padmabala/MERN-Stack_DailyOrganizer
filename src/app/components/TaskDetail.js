import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as mutations from '../store/mutations';
const TaskDetail=({id,comments,task,isComplete,groups,setTaskCompletion,setTaskGroup,setTaskName})=>(
    <div>
        <h2>
            <div>
            <input value={task.name} onChange={setTaskName}></input>
            </div>
        </h2>
        <div>
<button onClick={()=>setTaskCompletion(!isComplete)}>{isComplete?`Reopen`:`Complete`}</button>
        </div>
        <div>
        <select onChange={setTaskGroup} value={task.group}>
            {groups.map(group=>(
                <option key={group.id} value={group.id}>{group.name}</option>            
                ))}
        </select>
        </div>
        <div>
        <Link to="/dashboard">
            <button>Done</button>
        </Link>
        </div>
    </div>
)

const mapStateToProps=(state,ownProps)=>{
    let id=ownProps.match.params.id;
    let task=state.tasks.find(task=>task.id===id);
    let groups=state.groups;
    return{
        id,
        task,
        groups,
        isComplete:task.isComplete
    }
};
const mapDispatchToProps=(dispatch,ownProps)=>{
    const id=ownProps.match.params.id;
    return{
        setTaskCompletion(isComplete){
            const task={
                id,
                isComplete
            }
            dispatch(mutations.setTaskCompletion(id,isComplete))
        },
        setTaskGroup(e){
            const task={
                id,
                group:e.target.value
            }
            dispatch(mutations.setTaskGroup(id,e.target.value));
        },
        setTaskName(e){
            const task={
                id,
                name:e.target.value
            }
            console.log("task is", task);
            dispatch(mutations.setTaskName(id,e.target.value));
        }
    }
}
export const ConnectedTaskDetail=connect(mapStateToProps,mapDispatchToProps)(TaskDetail);