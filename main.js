video= "";
objectDetector="";
status="";
objects=[];

function preload(){
    
}
function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}
function draw(){
  image(video,0,0,480,380);
  if(status != ""){
      objectDetector.detect(video, gotResult);
      for(i=0; i< objects.length; i++){
          document.getElementById("status").innerHTML="Status: Object Detected";
          document.getElementById("number_of_objects").innerHTML="Number of objects detected are "+objects.length;
          fill("red");
          percent= floor(objects[i].confidence*100);
          text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
          noFill();
          stroke("red");
          rect(objects[i].x,objects[i].y,objects[i].height,objects[i].width);
  
          if(objects[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("status").innerHTML = object_name + " Not Found";
          }       
  
        }
  }
  }
  function gotResult(error, results) 
  {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects= results;
  }
  
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
object_name =document.getElementById("frame").value;
  }

function modelLoaded(){
    console.log("Model loaded!")
    status=true;

}