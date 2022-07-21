function findDifference(){
  //make http call(file1, file2, mappingJson) -> server side finds difference -> returns difference.
  let structs = setupStructure();
  bomCompare(structs[0], structs[1]);
}

function arrayToString(line){
  let string = "";
  for(item of line){
    string += item + "\t";
  }
  string = string.slice(0, -1) + "\r\n";
  return string;
}

function createExportCsv(finalArray, struct1, struct2){
  let csv = "Change\t"+header1.slice(0,-1) +"\tnew" +header1.replaceAll("\t", "\tnew")  + "\r\n";
  let newLines = [];
  for(let i = 0; i < finalArray[0].length; i++){
    newLines.push(true);
  }

  for(let i = 0; i < finalArray.length; i++){
    let removedLine = true;
    for(let j = 0; j < finalArray[i].length; j++){
      if(finalArray[i][j] == "G"){
        csv += finalArray[i][j] + "\t"+arrayToString(struct1[i]);
        removedLine = false;
        newLines[j] = false;
      }else if(finalArray[i][j] == "O"){
        csv += finalArray[i][j] + "\t"+arrayToString(struct1[i]).slice(0, -2) + "\t" + arrayToString(struct2[j]);
        removedLine = false;
        newLines[j] = false;
      }else{
        newLines[j] = newLines[j] && true;
        removedLine = removedLine && true;
      }
    }
    if(removedLine){
      csv += "R\t"+arrayToString(struct1[i]);
    }
  }
  for(let i = 0; i < newLines.length; i++){
    if(newLines[i]){
      csv += "Y\t"+arrayToString(struct2[i]);
    }
  }
  return csv;
}

function bomCompare(struct1, struct2){
  let finalArray = []
  for(row1 of struct1){
    rowArray = [];
    for(row2 of struct2){
      if(struct1[0].length == row1.length && struct2[0].length == row2.length){
        rowArray.push(compareRow(row1, row2));
      }
    }
    finalArray.push(rowArray);
  }
  let exports = createExportCsv(finalArray, struct1, struct2);
  download("Comparison", exports);
}

function setupRowComparison(row1, row2){
  let temp = [];
  for(let i = 0; i<row1.length; i++){
    if(row1[i] == row2[mappingJson.headerMapper[i].header]){
      temp.push(true);
    }else{
      temp.push(false);
    }
  }
  return temp;
}

function checkIfSameRow(temp){
  let sameRow = true;
  for(key of mappingJson.keyMapper){
    sameRow = sameRow && temp[key]
  }
  return sameRow;
}

function checkIfChangeToRow(temp){
  let noChange = true;
  for(item of temp){
    noChange = noChange && item;
  }
  return noChange?"G":"O";
}

//let mappingJson = {"headerMapper": [], "keyMapper": [], "regexMapper" : []}
function compareRow(row1, row2){
  let temp = setupRowComparison(row1, row2);
  let sameRow = checkIfSameRow(temp);
  if(sameRow){
    return checkIfChangeToRow(temp);
  }
  return "";
}
