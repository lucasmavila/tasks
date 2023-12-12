import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse';

const __dirname = dirname(fileURLToPath(import.meta.url));

const csvParse = parse({ delimiter: ',', skipEmptyLines: true, fromLine: 2 })

async function processCSV(){

  const stream = fs.createReadStream(`${__dirname}/tasks.csv`)

  const pipe = stream.pipe(csvParse)
  
  let count = 0

  for await (const record of pipe) {

    // Work with each record
    const [title, description] = record


    if(title && description){

      const saved = await sendRecord({title, description})
      
      process.stdout.write(`${count++} ${title} | ${description} | ${saved.id} \n`);

    }else{
      process.stdout.write(`${count++} ${title} | ${description} | MISSING DATA - NOT SAVED \n`);
    }

    await sleep()
  }
}

async function sleep(){
  await new Promise((resolve) => setTimeout(resolve, 500));
}

async function sendRecord({title, description}){

  const endpoint = 'http://localhost:3000/tasks'
  
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description
    })
  })

  return await result.json()

}

processCSV()