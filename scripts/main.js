let files = [];
let mappingFile = [];
let file1, file2;
let header1, header2;
let mappingJson = {"headerMapper": [], "keyMapper": [], "regexMapper" : []}

function getHeader(file){
  return new Promise(resolve => {
    reader = new FileReader();
     reader.readAsText(file)
     reader.onload = function (e) {
       resolve(e.target.result);
     };
  });
}

async function readHeaders(){
  const notTwoFiles = files.length !== 2;
  if(notTwoFiles) return alert("You have to upload two BOMS!");

  file1 = await getHeader(files[0]);
  file2 = await getHeader(files[1]);
  if(mappingFile.length != 0) mappingJson = JSON.parse(await getHeader(mappingFile[0]))

  header1 = file1.split("\n")[0]
  header2 = file2.split("\n")[0]
  showHeaderMapperScreen();
}

function hasDuplicates(map){
  newMap = [];
  for(item in map){
    if(item < map.length){
      newMap[item] = map[item].options.selectedIndex;
    }
  }
  return (new Set(newMap)).size !== newMap.length;
}

function assignHeaderMap(){
  const map = document.getElementsByClassName("select");
  const key = document.getElementById("key").options;
  if(hasDuplicates(map)) return alert("One header can't be assigned to multiple!")

  const keyNotSelect = key.selectedIndex == -1;
  if(keyNotSelect) return alert("Please select a key / key combination!")

  headerMapping(map, key);

  showRegexScreen();
}

function regexMapping(){
  mappingJson.regexMapper = [];
  const regexInputs = document.getElementsByClassName("regex");
  for(let i = 0; i < regexInputs.length; i+=2){
    mappingJson.regexMapper.push({"bom1": regexInputs[i].value, "bom2": regexInputs[i+1].value});
  }
}

function headerMapping(map, key){
  mappingJson.headerMapper = [];
  mappingJson.keyMapper = [];
  for(item of map){
    mappingJson.headerMapper.push({"header" : item.options.selectedIndex});
  }
  for(item in key){
    if(item < key.length && key[item].selected){
      mappingJson.keyMapper.push(item);
    }
  }
}

function saveRegexMapping(){
  regexMapping();
  findDifference();
}

function downloadMapperFile(){
  regexMapping();
  download("mappingFile", JSON.stringify(mappingJson));
  findDifference();
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
