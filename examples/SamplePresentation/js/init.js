function init() {
  var roleNode = document.querySelector("body").getAttributeNode("data-asq-role");
  if ( typeof roleNode == undefined ) {
    setRole("viewer");
  } else {
    setRole(roleNode.value);
  }
}

function setRole(role) {
  var allAsqElements = getASQElements();
  allAsqElements.forEach(function(elem, index) {
    elem.role = role;
  });
}

function getASQElements() {
  var allAsqElements = document.querySelectorAll('html /deep/ *');

  allAsqElements = Array.prototype.slice.call(allAsqElements).filter(function(el) {
    return isASQEl(el);
  });

  return allAsqElements;

  function isASQEl(el) {
    return el.localName.indexOf('asq-') != -1;
  } 
} 