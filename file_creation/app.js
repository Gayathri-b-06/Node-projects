
import  fs from "fs";
import readline from "readline";

const rl=readline.createInterface({
  input:process.stdin,
  output:process.stdout
});



const createFile =(path)=>{
  rl.question("enter the file name:",(filename)=>{
    rl.question("enter the content:",(content)=>{
        fs.writeFile(`${filename}.txt`,content,(err)=>{
          if(err) console.log("error while creating file")
          else console.log(`File ${filename}.txt created successfully`);
           rl.close();
        })

    })
   
  });
  
}

createFile();