

$(document).ready(function(){

    console.log("_____________");
    var $codePane = $("#code code");
    var newHtml = $("#code").attr('data-asq-code');
    var $vDOM = $('<div>' + newHtml + '</div>');
    var codeTree = createTree($vDOM, "", "");
    $codePane.html(codeTree);
    
    // magic happens here
    var $selInput = $('#sel-input');
    $selInput.on('input', function(){
        var value = $selInput.val();
        var $clone = $vDOM.clone();
        var selected = $clone.find(value).each(function(){
            $(this).attr('data-asq-selected', "true");
        });
        codeTree = createTree($clone, "", "");
        $codePane.html(codeTree);
    });
});


// recursive function that creates the escaped tree of the html
// annotated with spans
function createTree($el, treeStr, tabwidth){
    var nextTabwidth = tabwidth || "";
    $el.children().each(function(){
        var $this = $(this);
        var spanOpenTag = "<span>";

        if($this.attr('data-asq-selected') === "true"){
            spanOpenTag = '<span style="background-color:#fd2343;">';
        }

        treeStr += tabwidth + spanOpenTag;
        treeStr += escapeHtml(getElOpeningTag(this));
        treeStr += '</span>'+ '\n';


        //generate tree for children of current
        nextTabwidth = tabwidth + "  ";
        treeStr = createTree($this, treeStr, nextTabwidth);

        //back to current 
        treeStr += tabwidth + spanOpenTag;
        treeStr +=  escapeHtml("</" + $this.prop("tagName").toLowerCase() + ">");
        treeStr += '</span>'+ '\n';
    });
        
    return treeStr;
}


var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
}

function getElOpeningTag(el){
    var str ="<";
    str += $(el).prop("tagName").toLowerCase();
    
    //get all attribures
    $.each(el.attributes, function() {
    // this.attributes is not a plain object, but an array
    // of attribute nodes, which contain both the name and value
        if(this.specified && this.name !=='data-asq-selected' ) {
          str += ' ' + this.name;
          str += '="' + this.value + '"';
        }
    });
    str+=">"
    return str;
}