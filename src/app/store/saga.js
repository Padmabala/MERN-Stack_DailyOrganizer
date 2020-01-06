import {take,put,select} from 'redux-saga/effects';
import * as mutations from "./mutations";
import uuid from 'uuid';
import axios from 'axios';

const url="http://localhost:8888";

export function* taskCreationSaga(){
    while(true){
        const {groupID}=yield take(mutations.REQUEST_TASK_CREATION);
        console.log("Createing in the group",groupID);
        const ownerID='u1';
        const taskID=uuid();
        const name="New Task is here";
        yield put(mutations.createTask(taskID,groupID,ownerID,name));
        const {res}=yield axios.post(url+`/task/new`,{
            task:{
                id:taskID,
                group:groupID,
                owner:ownerID,
                name:name,
                isComplete:false,
                
            }
        })
        console.info("Got Response ",res);
    }
}
export function* taskModificationSaga(){
    while(true){
        console.log("Hellllllllllllllo ");
        const task=yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE
        ]);
        console.log("sagaaaaaaaaaaa",task);
        axios.post(url+`/task/update`,{//task
            task:{
                id:task.taskID,
                group:task.groupID,
                name:task.name,
                isComplete:task.isComplete
            }
        })

    }
}
