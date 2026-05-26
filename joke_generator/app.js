import https from 'https';
import chalk  from 'chalk';

const getJoke=()=>
{
  const url="https://official-joke-api.appspot.com/random_joke";
  https.get(url,(res)=>{
    let data="";
    res.on('data',(chunk)=>{
      data+=chunk;
    })

    res.on('end',()=>{
      const joke=JSON.parse(data);
      console.log(`Here is the random ${joke.type} joke:\n`);
      console.log(chalk.bgRedBright(`${joke.setup}`));
       console.log(chalk.blueBright(`${joke.punchline}`));

    })
    res.on('err',()=>{
      console.log("error ocuured")
    })
  })
}


getJoke();
