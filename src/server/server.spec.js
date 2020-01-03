import {addNewTask,updateTask} from './server';

(async function myfunc(){
    await addNewTask({
        name:"New Tasks",
        id:"123456"
    });
    await updateTask({
        id:"123456",
        name:"Really New Task"
    });
})();

