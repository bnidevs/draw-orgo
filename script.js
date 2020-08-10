window.onload = () => {
  elements = document.getElementsByClassName("element");
  for(e of elements){
    e.setAttribute("draggable", "true");
  }
}
