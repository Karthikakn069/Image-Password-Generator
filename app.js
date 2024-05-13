var imagesArr = [];
var passes = [/*Create your own 9 password set here*/]
var shuffPasses = [];
var shuffImages = [];
var selectedNumber = 0;
var finalPass = "";
document.getElementById('topic-opt').addEventListener('change', topicChange);
document.getElementById('generate-button').addEventListener('click', passGenerate);
document.getElementById('to-copy').addEventListener('click',copyText);
function topicChange(){
  var topic = document.getElementById('topic-opt').value;
  var topicname = document.querySelector('.topic-name');
  imagesArr = [];
  shuffImages = [];
  shuffPasses = [];
  selectedNumber = 0;
  finalPass ="";
  if(topic !== "---"){
    topicname.innerHTML = topic;
    for(var i = 1;i<=9;i++){
      imagesArr.push(`img-${i}`);
    }
    //console.log(topicname.innerHTML)
    shuffleImages(imagesArr);
    var html =``;
    for(var i = 0;i<9;i++){
      //html += `<div class='grid-item' id="grid-${i+1}" onclick="imageClick(this)"><img src="./images/${shuffImages[i]}.jpg" alt='${shuffImages[i]}'></div>`;
      html += `<div class='grid-item' id="grid-${i+1}"><img src="./images/${topic}/${shuffImages[i]}.jpg" alt='${shuffImages[i]}'></div>`;
    }
    var grid = document.querySelector('.grid-container');
    grid.innerHTML = html;
    var gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(
      function(gridItem){
        gridItem.addEventListener('click' , function (){
          imageClick(gridItem);
        })
      }
    )
  }
  else{
    topicname.innerHTML ="";
    var grid = document.querySelector('.grid-container');
    grid.innerHTML = "";
  }
  //console.log(topicname.innerHTML);
}
function shuffleImages(){
  var visited = [0,0,0,0,0,0,0,0,0];
  var count = 0;
  while(count <= 8){
    var index = Math.round(Math.random()*8);
    while(visited[index] != 0){
      index = Math.round(Math.random()*8);
    }
    visited[index] = 1;
    shuffImages.push(imagesArr[index]);
    shuffPasses.push(passes[index]);
    count++;
  }
  //console.log(shuffImages)
}
function imageClick(id){
  selectedNumber += 1;
  var str = id.id;
  var index= str[str.length-1]-1;
  finalPass += shuffPasses[index];
  var gridElement = document.querySelector(`#${str}`);
  gridElement.removeAttribute("onclick");
  gridElement.classList.add("grid-selected");
  gridElement.innerHTML = `<p>${selectedNumber}</p>`;
  //console.log(id.id);
}
function passGenerate(){
  var spanClass = document.querySelector('.final-pass');
  var shiftVal = asciiVal();
  var codedPass = "";
  //console.log(shiftVal);
  for(var i = 0;i<finalPass.length;i++){
    var shiftAscii = finalPass.charCodeAt(i)+shiftVal;
    if(shiftAscii > 126) shiftAscii %=126;
    if(shiftAscii < 33) shiftAscii += 33;
    //console.log(shiftAscii+" "+finalPass.charCodeAt(i));
    codedPass += String.fromCharCode(shiftAscii);
  }
  spanClass.innerHTML = codedPass;
  finalPass = "";
  selectedNumber = 0;
  topicChange();
}
function asciiVal(){
  var val = document.getElementById("add-input").value;
  var finalVal = 0;
  for(var i = 0;i<val.length;i++){
    finalVal += (val[i].charCodeAt(0));
  }
  //console.log(finalVal%126);
  return finalVal%126;
}
function copyText(){
  var ele = document.getElementById("to-copy");
  navigator.clipboard.writeText(ele.innerHTML);
  //console.log(ele.innerHTML);
}