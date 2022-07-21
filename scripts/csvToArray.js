function setupStructure(){
  let struct1 = [];
  let file1Struct = file1.split("\r\n");
  for(index in file1Struct){
    if(index != 0){
      const file1LineStruct = file1Struct[index].split("\t");
      let lineArray = []
      for(index2 in file1LineStruct){
        if(mappingJson.regexMapper[index2].bom1 != ""){
          lineArray.push(file1LineStruct[index2].replaceAll(mappingJson.regexMapper[index2].bom1, mappingJson.regexMapper[index2].bom2));
        }else{
          lineArray.push(file1LineStruct[index2]);
        }
      }
      struct1.push(lineArray)
    }
  }

  let struct2 = [];
  let file2Struct = file2.split("\r\n");
  for(index in file2Struct){
    if(index != 0){
      const file2LineStruct = file2Struct[index].split("\t")
      let lineArray = []
      for(index2 in file2LineStruct){
        if(mappingJson.regexMapper[index2].bom2 != ""){
          lineArray.push(file2LineStruct[index2].replaceAll(mappingJson.regexMapper[index2].bom2, mappingJson.regexMapper[index2].bom1));
        }else{
          lineArray.push(file2LineStruct[index2]);
        }
      }
      struct2.push(lineArray)
    }
  }
  return [struct1, struct2];
}
