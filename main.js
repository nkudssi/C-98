camera = document.getElementById("camera");
Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});



var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function(event){
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);
    if(Content == "Take my selfie."){
        console.log("taking selfie");
        speak();
    }

}
function take_snapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML = '<img id="selfieimg" src="'+data_url+'">';
    });
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data = "Taking your selfie in 5 seconds.";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    }, 5000 );
}
function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfieimg").src;
    link.href = image;
    link.click();
}