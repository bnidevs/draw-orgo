window.onload = () => {
  elements = document.getElementsByClassName("element");
  for(e of elements){
    e.setAttribute("draggable", "true");
    e.ondragstart = drag;
  }

  org_canvas = document.getElementById("org_canvas");
  var grid = document.createElement("div");
  grid.className = "grid";

  var x = 2;

  for(var j = 0; j < 25; j++){
    var row = document.createElement("div");
    row.className = "row";

    if(x == 1){
      row.className += " offset";
    }

    for(var i = 0; i < 17; i++){
      var insertion = document.createElement("div");
      if(i % 3 == x){
        insertion.className = "blank_ins";
      }else{
        insertion.className = "ins brdr-no";
        insertion.ondragenter = allowDrop;
        insertion.ondragleave = revertDrag;
        insertion.ondragover = allowDrop;
        insertion.setAttribute("ondrop", "drop(event);");
      }
      row.appendChild(insertion);
    }

    if(x == 2){
      x = 1;
    }else{
      x = 2;
    }

    grid.appendChild(row);
  }
  org_canvas.appendChild(grid);
}

// document.getElementById("org_canvas").addEventListener("")

var allowDrop = (ev) => {
  ev.preventDefault();
  ev.target.classList.add('brdr-hl');
}

var revertDrag = (ev) => {
  ev.target.classList.remove('brdr-hl');
}

var drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.innerText);
}

var drop = (ev) => {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.innerText = data;
  if(ev.target.classList.contains('brdr-hl')){
    ev.target.classList.remove('brdr-hl');
  }
}
