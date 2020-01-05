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
        yield put(mutations.createTask(taskID,groupID,ownerID));
        const {res}=yield axios.post(url+`/task/new`,{
            task:{
                id:taskID,
                group:groupID,
                owner:ownerID,
                isComplete:false,
                name:"New Task is here"
            }
        })
        console.info("Got Response ",res);
    }
}
export function* taskModificationSaga(){
    while(true){
        console.log("Hellllllllllllllo ");
        const {task}=yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE
        ]);
        console.log("sagaaaaaaaaaaa",task);
        axios.post(url+`/task/update`,{
            task:{
                id:task.taskID,
                group:task.groupID,
                name:task.name,
                isComplete:task.isComplete
            }
        })

    }
}