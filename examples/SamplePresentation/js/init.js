function init() {
  //detect if we need to render anything or the user is just chilin
  var search = window.location.search;
  if (search.match(/viewer/)) {
    setRole("viewer");
  } else if (search.match(/presenter/)) {
    setRole("presenter");
  } else if (search.match(/ta/)) {
    setRole("ta");
  } else if (typeof cb !== 'undefined' && typeof cb === 'function') {
    // cb.call(this, null, true);
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