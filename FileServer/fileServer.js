/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const port = 8080;

const fileArray = [];
const dir = "./files";
let read = 0;

// console.log(files); 
// ["a.txt","b.txt"]
// const filePath = path.join(dir, file);

// app.get("/files",(req,res)=>{
//   // Response: 200 OK with an array of file names in JSON format.
//   fs.readdir(dir,(err,files)=>{
//     if(err){
//       console.log("Error");
//       return;
//     }
//     files.forEach((file)=>{
//       const filePath = path.join(dir,file);
//       fs.readFile(filePath,"utf-8",(err,data)=>{
//         fileArray.push({
//           fileName : file,
//           content : data,
//         });
//         read+=1;
//         if(read === files.length){
//           res.send(`
//           <h1>File System</h1>
//           <h3>File Details : </h3>
//           <ol>
//             ${fileArray.map((file) => (
//               `<li>File Name : ${file.fileName} <br/> Contents : ${file.content}</li>`
//             )).join('')}
//           </ol>
//         `);
//         }
//       })
//     })

//   })
// })

app.get("/files", (req, res) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).json(files);
  });
});

app.get("/file/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(dir, filename);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      res.status(200).send(data);
    }
  });
});

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// app.get("/files/:fileName",(req,res)=>{
//   const fileName = req.params.fileName;
//   "files/a.txt"
//   const filePath = path.join(dir,fileName);
//   fs.readFile(filePath,"utf-8",(err,data)=>{
//     if(err){
//       res.send("<h3><i>Error! File not found</i></h3>")
//       return;
//     }
//     res.send(data);
//   })
// })


module.exports = app;