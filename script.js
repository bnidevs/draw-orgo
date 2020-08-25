var selected = null;
var cnxns = [];
var grid_arr = [];

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
    var row_arr = [];
    var row = document.createElement("div");
    row.className = "row";

    if(x == 1){
      row.className += " offset";
    }

    for(var i = 0; i < 18; i++){
      var insertion = document.createElement("div");
      if(i % 3 == x){
        insertion.className = "blank_ins brdr-no";
      }else{
        insertion.className = "ins brdr-no";
        insertion.ondragenter = allowDrop;
        insertion.ondragleave = revertDrag;
        insertion.ondragover = allowDrop;
        insertion.setAttribute("ondrop", "drop(event);");
        insertion.addEventListener("click", insClick);
      }
      row_arr.push(insertion);
      row.appendChild(insertion);
    }

    grid_arr.push(row_arr);

    if(x == 2){
      x = 1;
    }else{
      x = 2;
    }

    grid.appendChild(row);
  }
  org_canvas.appendChild(grid);

  var lines = document.createElement("div");
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = "lines";
  svg.setAttribute('width','100vw');
  svg.setAttribute('height','100vh');

  for(var i = 0; i < grid_arr.length; i++){
    for(var j = 0; j < grid_arr[0].length - 1; j++){
      if(!grid_arr[i][j].classList.contains("blank_ins") && !grid_arr[i][j+1].classList.contains("blank_ins")){
        var line = document.createElementNS('http://www.w3.org/2000/svg', "line");
        var coords_begin = getCoords(grid_arr[i][j]), coords_end = getCoords(grid_arr[i][j+1]);
        line.setAttribute('x1', coords_begin[0]);
        line.setAttribute('y1', coords_begin[1]);
        line.setAttribute('x2', coords_end[0]);
        line.setAttribute('y2', coords_end[1]);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-opacity', '0.1');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);

        // var bondlevel = document.createElementNS('http://www.w3.org/2000/svg', "text");
        // bondlevel.setAttribute('x', (coords_begin[0] + coords_end[0]) / 2 - 5);
        // bondlevel.setAttribute('y', (coords_begin[1] + coords_end[1]) / 2 + 5);
        // bondlevel.style.font = "bold 15px sans-serif";
        // bondlevel.style.fill = "transparent";
        // bondlevel.innerHTML = "1";
        // svg.appendChild(bondlevel);

        const first = grid_arr[i][j];
        const second = grid_arr[i][j+1];
        const connecting = line;
        cnxns.push(new MutationObserver(function(mutations){
          if((first.innerHTML != "" && first.innerHTML != null) && (second.innerHTML != "" && second.innerHTML != null)){
            connecting.setAttribute('stroke-opacity', '1');
          }else{
            connecting.setAttribute('stroke-opacity', '0.1');
          }
        }));
        cnxns[cnxns.length - 1].observe(grid_arr[i][j], {characterData: true, childList: true, subtree: true});
        cnxns[cnxns.length - 1].observe(grid_arr[i][j+1], {characterData: true, childList: true, subtree: true});
      }
    }
  }

  for(var i = 1; i < grid_arr.length; i++){
    for(var j = 0; j < grid_arr[0].length; j++){
      if(!grid_arr[i][j].classList.contains("blank_ins")){
        if(j > 0 && !grid_arr[i-1][j-1].classList.contains("blank_ins") && i % 2 == 1){
          var line = document.createElementNS('http://www.w3.org/2000/svg', "line");
          var coords_begin = getCoords(grid_arr[i][j]), coords_end = getCoords(grid_arr[i-1][j-1]);
          line.setAttribute('x1', coords_begin[0]);
          line.setAttribute('y1', coords_begin[1]);
          line.setAttribute('x2', coords_end[0]);
          line.setAttribute('y2', coords_end[1]);
          line.setAttribute('stroke', 'black');
          line.setAttribute('stroke-opacity', '0.1');
          line.setAttribute('stroke-width', '2');
          svg.appendChild(line);

          // var bondlevel = document.createElementNS('http://www.w3.org/2000/svg', "text");
          // bondlevel.setAttribute('x', (coords_begin[0] + coords_end[0]) / 2 - 5);
          // bondlevel.setAttribute('y', (coords_begin[1] + coords_end[1]) / 2 + 5);
          // bondlevel.style.font = "bold 15px sans-serif";
          // bondlevel.style.fill = "transparent";
          // bondlevel.innerHTML = "1";
          // svg.appendChild(bondlevel);

          const first = grid_arr[i][j];
          const second = grid_arr[i-1][j-1];
          const connecting = line;
          cnxns.push(new MutationObserver(function(mutations){
            if((first.innerHTML != "" && first.innerHTML != null) && (second.innerHTML != "" && second.innerHTML != null)){
              connecting.setAttribute('stroke-opacity', '1');
            }else{
              connecting.setAttribute('stroke-opacity', '0.1');
            }
          }));
          cnxns[cnxns.length - 1].observe(grid_arr[i][j], {characterData: true, childList: true, subtree: true});
          cnxns[cnxns.length - 1].observe(grid_arr[i-1][j-1], {characterData: true, childList: true, subtree: true});
        }

        if(i % 2 == 0 && !grid_arr[i-1][j+1].classList.contains("blank_ins")){
          var line = document.createElementNS('http://www.w3.org/2000/svg', "line");
          var coords_begin = getCoords(grid_arr[i][j]), coords_end = getCoords(grid_arr[i-1][j+1]);
          line.setAttribute('x1', coords_begin[0]);
          line.setAttribute('y1', coords_begin[1]);
          line.setAttribute('x2', coords_end[0]);
          line.setAttribute('y2', coords_end[1]);
          line.setAttribute('stroke', 'black');
          line.setAttribute('stroke-opacity', '0.1');
          line.setAttribute('stroke-width', '2');
          svg.appendChild(line);

          // var bondlevel = document.createElementNS('http://www.w3.org/2000/svg', "text");
          // bondlevel.setAttribute('x', (coords_begin[0] + coords_end[0]) / 2 - 5);
          // bondlevel.setAttribute('y', (coords_begin[1] + coords_end[1]) / 2 + 5);
          // bondlevel.style.font = "bold 15px sans-serif";
          // bondlevel.style.fill = "transparent";
          // bondlevel.innerHTML = "1";
          // svg.appendChild(bondlevel);

          const first = grid_arr[i][j];
          const second = grid_arr[i-1][j+1];
          const connecting = line;
          cnxns.push(new MutationObserver(function(mutations){
            if((first.innerHTML != "" && first.innerHTML != null) && (second.innerHTML != "" && second.innerHTML != null)){
              connecting.setAttribute('stroke-opacity', '1');
            }else{
              connecting.setAttribute('stroke-opacity', '0.1');
            }
          }));
          cnxns[cnxns.length - 1].observe(grid_arr[i][j], {characterData: true, childList: true, subtree: true});
          cnxns[cnxns.length - 1].observe(grid_arr[i-1][j+1], {characterData: true, childList: true, subtree: true});
        }

        if(!grid_arr[i-1][j].classList.contains("blank_ins")){
          var line = document.createElementNS('http://www.w3.org/2000/svg', "line");
          var coords_begin = getCoords(grid_arr[i][j]), coords_end = getCoords(grid_arr[i-1][j]);
          line.setAttribute('x1', coords_begin[0]);
          line.setAttribute('y1', coords_begin[1]);
          line.setAttribute('x2', coords_end[0]);
          line.setAttribute('y2', coords_end[1]);
          line.setAttribute('stroke', 'black');
          line.setAttribute('stroke-opacity', '0.1');
          line.setAttribute('stroke-width', '2');
          svg.appendChild(line);

          // var bondlevel = document.createElementNS('http://www.w3.org/2000/svg', "text");
          // bondlevel.setAttribute('x', (coords_begin[0] + coords_end[0]) / 2 - 5);
          // bondlevel.setAttribute('y', (coords_begin[1] + coords_end[1]) / 2 + 5);
          // bondlevel.style.font = "bold 15px sans-serif";
          // bondlevel.style.fill = "transparent";
          // bondlevel.innerHTML = "1";
          // svg.appendChild(bondlevel);

          const first = grid_arr[i][j];
          const second = grid_arr[i-1][j];
          const connecting = line;
          cnxns.push(new MutationObserver(function(mutations){
            if((first.innerHTML != "" && first.innerHTML != null) && (second.innerHTML != "" && second.innerHTML != null)){
              connecting.setAttribute('stroke-opacity', '1');
            }else{
              connecting.setAttribute('stroke-opacity', '0.1');
            }
          }));
          cnxns[cnxns.length - 1].observe(grid_arr[i][j], {characterData: true, childList: true, subtree: true});
          cnxns[cnxns.length - 1].observe(grid_arr[i-1][j], {characterData: true, childList: true, subtree: true});
        }
      }
    }
  }

  org_canvas.append(svg);

  document.addEventListener("keyup", del);

  document.getElementById("print_button").addEventListener("click", print);
  document.getElementById("save_button").addEventListener("click", save);
}

// document.getElementById("org_canvas").addEventListener("")

var getCoords = (box) => {
  var boundingRect = box.getBoundingClientRect();

  return [(boundingRect.left + boundingRect.right) / 2, (boundingRect.top + boundingRect.bottom) / 2]
}

var hashCoords = (w, x, y, z) => {
  return "" + w + "," + x + "x" + y + "," + z;
}

var insClick = (ev) => {
  if(selected == ev.target){
    selected.classList.remove("brdr-hl");
    selected = null;
  }else{
    if(selected != null){
      selected.classList.remove("brdr-hl");
    }
    selected = ev.target;
    selected.classList.add("brdr-hl");
  }
}

var del = (ev) => {
  if(ev.key === 'Backspace' && selected != null){
    selected.innerText = "";
    selected.classList.remove("brdr-hl");
    selected.classList.remove("print");
    selected = null;
  }
}

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

var print = (ev) => {
  // var w = window.open();
  // w.document.write('<link rel="stylesheet" href="style.css">');
  // w.document.write(document.getElementById("org_canvas").innerHTML);
  // var lines = w.document.getElementsByTagName("line");
  // for(var i = 0; i < lines.length; i++){
  //   if(lines[i].getAttribute("stroke-opacity").toString() != '1'){
  //     lines[i].setAttribute("stroke-opacity", '0.1');
  //   }
  // }
}

var save = (ev) => {
  var elem = document.createElement('a');

  var saved_text = '';

  for(var i = 0; i < grid_arr.length; i++){
    for(var j = 0; j < grid_arr[0].length; j++){
      if(grid_arr[i][j].innerHTML != "" && grid_arr[i][j].innerHTML != null){
        saved_text += grid_arr[i][j].innerHTML;
      }else{
        saved_text += ' ';
      }
      saved_text += ',';
    }
  }

  saved_text = saved_text.slice(0, -1);

  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(saved_text));
  elem.setAttribute('download', 'compound.orgodraw');
  elem.style.display = 'none';
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}
