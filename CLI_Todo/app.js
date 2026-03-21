import { log } from 'console';
import readline from 'readline';
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const todos=[];


const showMenu =()=>{
  console.log("\n1. Add a todo");
  console.log("2. View todos");
  console.log("3. Exit");
  rl.question("Choose an option:",handleInput);

}

const handleInput=(option)=>{
  if(option==1)
  {
    rl.question("Enter a task:",(task) => {
        todos.push(task);
        console.log("Your task was added succesfully:",task);
        showMenu();
    })
  }
  else if(option==2){
    console.log("\nyour tasks:");
    todos.forEach((task,index)=>{
      console.log(`${1+index}.${task}`);
      
    })
    showMenu(); 
  }
  else if(option==3)
  {
    console.log("Bye Bye...")
    rl.close();
  }
  else
  {
    console.log("please enter invalid option to continue..");
    
  }
}
showMenu();