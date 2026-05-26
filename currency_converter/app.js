import https from 'https';
import readline from 'readline';
import chalk from 'chalk';

const api_key="fcaedfb2bcfe8eefd344cc84";
const url=`https://v6.exchangerate-api.com/v6/${api_key}/latest/USD`
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const convert=(amt,rate)=>{
  return amt*rate.toFixed(2);
}
https.get(url,(res)=>{
  let data="";
  res.on("data",(chunk)=>{
    data+=chunk;
  });

  res.on("end",()=>{
    const rates=JSON.parse(data).conversion_rates;
    console.log(rates)
    rl.question("enter the usd amount:",(amt)=>{
      rl.question("Enter the target currency:",(curr)=>{
          const rate=rates[curr.toUpperCase()];
          if(rate){
          console.log(`${amt} usd is ${convert(amt,rate)} in ${curr}`);
          }
          else{
            console.log("Invalid code");
          }
          rl.close();
      })
    })
  })
})
