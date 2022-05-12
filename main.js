
song = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
  song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', gotPoses);

}

function modalLoaded()
    {
        console.log('PoseNet Is Intialized');
    }

function gotPoses(results)
{
    if(results.length > 0)
{
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("Score Right_Wrist = " + scoreRightWrist + "Score Left_Wrist = " + scoreLeftWrist);

    leftWristX= results[0].pose.leftWrist.x;
    leftWristY= results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
}
}


function draw()
{
    image(video, 0, 0, 600, 500);

    stroke("#f54242");
    fill("#f54242");
    circle( rightWristX, rightWristY, 20);
    
    if(scoreRightWrist > 0.2)
    {
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5); 
        }
        
        if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "speed = 0.7x";
            song.rate(0.7);
        }
    
        if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
    
        if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
    
        if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHtml = "speed = 2x";
            song.rate(2);
        }
    }
   

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        Remove_decimal = floor(InNumberLeftWristY);
        volume = Remove_decimal/500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
