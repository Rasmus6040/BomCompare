function showHeaderMapperScreen(){
  document.getElementById("uploadScreen").classList = "hide";
  document.getElementById("mappingScreen").classList = "mappingScreen";
  let mapping = document.getElementById("mapping");
  mapping.innerHTML = "";

  const title = document.createElement("h1");
  title.innerHTML = "Please select the correct mapping";
  const titlediv = document.createElement("div");
  titlediv.append(title);
  mapping.append(titlediv);

  const subtitle = document.createElement("p");
  subtitle.innerHTML ="Left side is " + files[0].name + " and right side is " + files[1].name;
  const subtitlediv = document.createElement("div");
  subtitlediv.append(subtitle);
  mapping.append(subtitlediv);

  let form1 = document.createElement("div");
  form1.submit = "test()"

  const title1 = header1.split("\t");
  const title2 = header2.split("\t");
  for(let i = 0; i < title1.length; i++ ){
    const label = document.createElement("label");
          label.for = title1[i];
          label.innerHTML = title1[i] + ": ";
    form1.append(label);

    const select = document.createElement("select");
          select.classList = "select"
          select.name = title1[i];
          select.id = title1[i];
    form1.append(select);

    for(let j=0; j < title2.length; j++){
        const option = document.createElement("option");
        option.value = title2[j];
        option.innerHTML = title2[j];
        if(mappingFile.length != 0 && mappingJson.headerMapper[i].header == j){
          option.selected = true;
        }
        select.append(option);
    }
    form1.append(document.createElement("br"));
    form1.append(document.createElement("br"));
  }

  const subtitle2 = document.createElement("p");
  subtitle2.innerHTML ="Please select a unique combination from " + files[0].name + "<br> You can use ctrl / command click to select multiple.";
  form1.append(subtitle2);

  const select2 = document.createElement("select");
        select2.classList = "key";
        select2.multiple = true;
        select2.name = "Key pair";
        select2.id = "key";
  form1.append(select2);

  for(let i = 0; i < title1.length; i++){
    const option = document.createElement("option");
    option.value = title1[i];
    option.innerHTML = title1[i];
    for(let j = 0; j < mappingJson.keyMapper.length; j++){
      if(mappingFile.length != 0 && mappingJson.keyMapper[j] == i){
        option.selected = true;
      }
    }
    select2.append(option);
  }

  form1.append(document.createElement("br"));
  form1.append(document.createElement("br"));

  const submit = document.createElement("button");
  submit.innerHTML = "Submit";
  submit.setAttribute("onclick", "assignHeaderMap()");
  form1.append(submit);
  mapping.append(form1);
}

function showRegexScreen(){
    document.getElementById("mappingScreen").classList = "mappingScreen hide";
    const regexScreen = document.getElementById("regexScreen");
      regexScreen.classList = "";
      regexScreen.innerHTML = "";
      const title = document.createElement("h1");
      title.classList = "center";
      title.innerHTML = "Remove differences between two Boms"
      regexScreen.append(title);
      const subTitle = document.createElement("h3");
      subTitle.innerHTML = "If chars exists in "+
                            files[0].name+
                            " that should be removed insert them in the left box <br> else if chars exists in "
                            + files[1].name +
                            " that should be removed insert the chars in the right box.";
      subTitle.classList = "center textcenter";
      regexScreen.append(subTitle);

      const subtitleDiv = document.createElement("div");
      subtitleDiv.classList = "center";
      subtitleDiv.innerHTML = '<div class="center"> <div id="bomTitle1"> <p> ' + files[0].name + ' </p> </div> <div id="bomTitle2"> <p> ' + files[1].name + '</p> </div> </div>'
      regexScreen.append(subtitleDiv);

      const header1Array = header1.split("\t");
      const header2Array = header2.split("\t");

      for(title1 in header1Array){
        const div = document.createElement("div");
        div.classList = "center";
        first = mappingFile.length!=0?mappingJson.regexMapper[title1].bom1:"";
        second = mappingFile.length!=0?mappingJson.regexMapper[title1].bom2:"";
        div.innerHTML = '<div><p> ' +
                        header1Array[title1] +
                        ' </p><input class="regex" value="'+first+'"> </input></div><div><p> ' +
                        header2Array[mappingJson.headerMapper[title1].header] +
                        ' </p><input class="regex" value="'+second+'"> </input></div>'
        regexScreen.append(div);
      }

      const btndiv = document.createElement("div");
      btndiv.classList = "center";

      const btn = document.createElement("button");
      btn.classList = "btn wide";
      btn.setAttribute("onclick", "saveRegexMapping()")
      btn.innerHTML = "Get difference between BOMS";
      btndiv.append(btn);

      const btn2 = document.createElement("button");
      btn2.classList = "btn wide";
      btn2.setAttribute("onclick", "downloadMapperFile()")
      btn2.innerHTML = "Download mapping file";
      btndiv.append(btn2);
      regexScreen.append(btndiv);

}

function updateFilesView(){
  let parent = document.getElementById("uploads");
  parent.innerHTML = "";
  for (file in files){
    let container = document.createElement("div");
    container.classList = "img";
    container.setAttribute("onclick", "deleteFile("+ file +")");
    let img = document.createElement("img");
    img.src = "./img/csv.png";
    img.style = "margin: auto; cursor: pointer;";
    img.classList = "center";
    container.append(img);
    let name = document.createElement("p");
    name.id = "fileView";
    name.innerHTML = files[file].name;
    container.append(name);
    parent.append(container);
  }

  let parent2 = document.getElementById("uploads2");
  parent2.innerHTML = "";
  for (file in mappingFile){
    let container = document.createElement("div");
    container.classList = "img";
    container.setAttribute("onclick", "deleteFile2("+ file +")");
    let img = document.createElement("img");
    img.src = "./img/txt.png";
    img.style = "margin: auto; cursor: pointer;";
    img.classList = "center";
    container.append(img);
    let name = document.createElement("p");
    name.id = "fileView";
    name.innerHTML = mappingFile[file].name;
    container.append(name);
    parent2.append(container);
  }
}
