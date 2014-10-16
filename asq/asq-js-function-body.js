Polymer('asq-js-function-body', {
    domReady: function() {

        var $codeInput = this.$.code;

        // Question: why the code right below doesn't work?
        // var header = document.querySelector(".asq-code-header");

        var header = $(".asq-code-header");
        console.log($(".asq-code-header"), header.text());


        // var header = $('.asq-code-header').text();
        // var footer = $('.asq-code-footer').text();
        // var testCommand = $('.asq-evaluate').text();
        // var $codeInput = $('.asq-code-input');
        // var $asqResult = $('.asq-result');
        // var solution= '"<div>hello World</div>"'; 

        // initJsFunctionBody(header, footer, testCommand, $codeInput, $asqResult, solution);
    } 
});

function initJsFunctionBody(theHeader, theFooter, theTestCommand, theCodeInput, theAsqResult, theResultWrapper, theSolution) {
    var interval = 150;
    var timer;
    
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
            $('.asq-result-wrapper').addClass('asq-correct');
        }else{
            $('.asq-result-wrapper').removeClass('asq-correct');
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