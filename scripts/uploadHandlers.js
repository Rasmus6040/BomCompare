function inputHandler(){
  inputFiles = document.getElementById("inputTag").files;
  saveBomFiles(inputFiles, "input");
}

function inputHandler2(){
  inputFiles = document.getElementById("inputTag2").files;
  saveMapperFiles(inputFiles, "input");
}

function dropHandler(ev) {
  ev.preventDefault();

  const failTrigger = !ev.dataTransfer.items
  if (failTrigger) return alert("Fail trigger no items!");

  saveBomFiles(ev.dataTransfer.items, "drop");
}

function dropHandler2(ev){
  ev.preventDefault();

  const failTrigger = !ev.dataTransfer.items
  if (failTrigger) return alert("Fail trigger no items!");

  saveMapperFiles(ev.dataTransfer.items, "drop");
}

function getFile(file, type){
  if(type == "input") return file;

  const notFileType = file.kind !== 'file';
  if (notFileType) return null;

  return file.getAsFile();
}

function saveBomFiles(newFiles, type){
  const toManyBoms = newFiles.length > 2 || files.length > 1 || newFiles.length+files.length > 2;
  if(toManyBoms) return alert("You can only compare two BOMS!!")

  for (let i = 0; i < newFiles.length; i++) {
    // If dropped items aren't files, reject them
    let file = getFile(newFiles[i], type);
    if(file == null) return alert("Not a file type!");

    const notACSVType = file.type != "text/csv";
    if(notACSVType) return alert("Please convert your file to csv");

    files[files.length] = file;
    updateFilesView();
  }
}

function saveMapperFiles(newFiles, type){
  const toManyMappers = newFiles.length > 1 || mappingFile.length != 0
  if(toManyMappers) return alert("You can only have one mapping file!!");

  // If dropped items aren't files, reject them
  let file = getFile(newFiles[0], type);
  if(file == null) return alert("Not a file type!");

  const notTextType = file.type != "text/plain";
  if(notTextType) return alert("Please convert your file to text");

  mappingFile[0] = file;
  updateFilesView();
}

function dragOverHandler(ev) {
  ev.preventDefault();
}

function deleteFile(indeks){
  files.splice(indeks, 1);
  updateFilesView();
}

function deleteFile2(indeks){
  mappingFile.splice(indeks, 1);
  updateFilesView();
}
