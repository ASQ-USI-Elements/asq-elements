Polymer('asq-js-function-body', {
    domReady: function() {
        var $header = this.$.header;
        var $footer = this.$.footer;
        var $testCommand = this.$.evaluate;
        var $codeInput = this.$.code;
        var $asqResult = this.$.result;
        var $resultWrapper = this.$.wrapper;
        var solution= '"<div>hello World</div>"'; 

        initJsFunctionBody($header.innerHTML, $footer.innerHTML, $testCommand.innerHTML, 
            $codeInput, $asqResult, $resultWrapper, solution);
    } 
});

function initJsFunctionBody(theHeader, theFooter, theTestCommand, 
    theCodeInput, theAsqResult, theResultWrapper, theSolution) {

    var interval = 150;
    var timer;

    var header = theHeader;
    var footer = theFooter;
    var testCommand = theTestCommand;
    var $codeInput = $(theCodeInput);
    var $asqResult = $(theAsqResult);
    var $resultWrapper = $(theResultWrapper);
    var solution= theSolution;
    
    function getSubmittedCode(){
        var submission = header;
        submission += $codeInput.text();
        submission += footer;
        submission += ';\n' + testCommand;
        
        return submission;
    }

    function evalInput(expr){
        var result;
        try{
            result = eval(expr);
        }catch(err){
            result = err.toString();
        }    
        return JSON.stringify(result, undefined, 2);
    }
    
    function update(){
        var submission = getSubmittedCode();
        var result = evalInput(submission);
        $asqResult.text(result);
        if(result === solution){
            $resultWrapper.addClass('asq-correct');
        }else{
            $resultWrapper.removeClass('asq-correct');
        }        
    }
    
    $codeInput.keypress(function(evt){ 
        var keyCode = evt.keyCode || evt.which; 
        if (keyCode == 9) {
            alert("tono")
           evt.preventDefault();
        }
    });
    
    $codeInput.on('input', function(evt){
       clearInterval(timer);
       timer = setTimeout(update, interval);
    }); 
}