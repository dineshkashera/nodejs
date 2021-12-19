const fs = require('fs');
const filePath = './sampleData/notes.json';
const addNotes = function (title, body){
    const getData = readNotes(filePath);
    writeNotes(getData,title,body,filePath);

}

const removeNotes = function(removeId){
    const Notes = readNotes(filePath);
    const prevLength = Notes.length;
    const keepData = Notes.filter(function (note,key){
       return removeId !== key;
    });

    if(keepData.length < prevLength){
        writefile(keepData);
        console.log('Remove ' + removeId + ' key from notes.json file');
    }else{
        console.log('No any node is removed!!');
    }

}

const readNotes = function (filePath){
    try {
        const getBinaryData = fs.readFileSync(filePath);
        const tojsonString  = getBinaryData.toString();
        const toJsonObj     = JSON.parse(tojsonString);

        return toJsonObj;
    }catch(e){
        return [];
    }
}

const writeNotes = function(Notes,title,body,filePath){

    const findDuplicateEntry = Notes.filter(function(note){
        if(note.title === title){
            return true;
        }
    });

    if(findDuplicateEntry.length === 0){
        Notes.push({
            'title':title,
            'body':body
        });

        writefile(Notes);
        console.log('Notes Added!!');

    }else{
        console.log('Find duplicate entry');
    }
}

const writefile = function(Notes){
    const NotesStingfy = JSON.stringify(Notes);
    fs.writeFileSync(filePath,NotesStingfy);
}

module.exports = {
    'addNotes':addNotes,
    'removeNotes':removeNotes
}