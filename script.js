let btn = document.querySelector('#add-btn')
let div = document.querySelector('.list-block');
let list = [];
let clrbtn = document.querySelector('#clear-btn');
setcounter=()=>{
    var counter = (localStorage.getItem('counter'));
    if(counter == 'NaN' || counter == null){
        counter = '0';
        localStorage.setItem('counter',counter);
    }
}
function clear(){
    localStorage.clear();
    div.innerHTML = '';
}
function main(){
    console.log('inside main')
    var counter = JSON.parse(localStorage.getItem('counter'));
    counter = parseInt(counter);
    for(let i = 0;i<counter;i++){
        var json = localStorage.getItem('task'+String(i));
        json = JSON.parse(json);
        loadtask(json,i);
}
}
const stylefordiv=(taskdiv)=>{
    taskdiv.style.display = 'flex';
    taskdiv.style.justifyContent = 'flex-start';
    taskdiv.style.flexDirection = 'row';
    taskdiv.style.padding = '10px';
}
function loadtask(json,i){
    let taskdiv = document.createElement('div');
    taskdiv.setAttribute('class','task-div');
    stylefordiv(taskdiv);
    let task = document.createElement('input');
    task.setAttribute('type', 'checkbox');
    task.setAttribute('name', 'task');
    task.setAttribute('class','check-box');
    let id = String(i);
    task.setAttribute('id',id);
    let label = document.createElement('label')
    label.style.color = 'white';
    label.style.fontSize = '20px';
    label.setAttribute('for',id);
    label.innerHTML = json['name'];
    taskdiv.append(task,label);
    div.append(taskdiv);
    task.addEventListener('click',function(){
        task_id = 'task'+ String(i)
        var data = localStorage.getItem(task_id);
        data = JSON.parse(data);
        data['status'] = !data['status'];
        if(data['status']){
            label.style.textDecoration='line-through'
        }
        else{
            label.style.textDecoration='none'
        }
        data = JSON.stringify(task_id,data);
    })
}
clrbtn.onclick = ()=>{
    clear();
}
setcounter()
btn.onclick = ()=>{
    var val = document.getElementById('input-text');
    let task = {name:val.value,status:false}
    counter = localStorage.getItem('counter');
    task_value = JSON.stringify(task);
    task_key = 'task' + String(counter);
    localStorage.setItem(task_key,task_value);
    counter = parseInt(counter);
    counter = counter+1;
    localStorage.setItem('counter',String(counter));
    loadtask(task,counter);
};
main()