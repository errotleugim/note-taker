const fs = require("fs");
//npm package to assign ids, not sure if im using it right
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {


    app.get("/api/notes", (req, res) => {
        
        console.log("\n\nExecuting GET notes request");
     
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        
        console.log("\nGET request - Returning notes data: " + JSON.stringify(data));
              
        res.json(data);
    });

    app.post("/api/notes", (req, res) => {
    
        const newNote = request.body;
        
        console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));

        newNote.id = uuidv4();

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        data.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        
        console.log("\nSuccessfully added new note to 'db.json' file!");

        res.json(data);
    });



    app.delete("/api/notes/:id", (req, res) => {

        let noteId = request.params.id.toString();
        
        console.log(`\n\nDELETE note request for noteId: ${noteId}`);

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        const newData = data.filter( note => note.id.toString() !== noteId );

        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        
        console.log(`\nSuccessfully deleted note with id : ${noteId}`);

        res.json(newData);
    });
};