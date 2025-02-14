let video;
let latestPrediction = null;
let modelIsLoading  = true;
let narutoImage;


const FOREHEAD_POINT = 151;
const LEFT_FOREHEAD = 104;
const RIGHT_FOREHEAD = 333

const UPPERLIP_POINT = 13;
const BOTTOMLIP_POINT = 14;

const LEFT_UPPERCHEEK_POINT1 = 111;
const LEFT_UPPERCHEEK_POINT2 = 100;

const LEFT_MIDDLECHEEK_POINT1 = 36;
const LEFT_MIDDLECHEEK_POINT2 = 123;

const LEFT_BOTTOMCHEEK_POINT1 = 206;
const LEFT_BOTTOMCHEEK_POINT2 = 213;

const RIGHT_UPPERCHEEK_POINT1 = 340;
const RIGHT_UPPERCHEEK_POINT2 = 329;

const RIGHT_MIDDLECHEEK_POINT1 = 266;
const RIGHT_MIDDLECHEEK_POINT2 = 352;

const RIGHT_BOTTOMCHEEK_POINT1 = 426;
const RIGHT_BOTTOMCHEEK_POINT2 = 433;

const RIGHT_EYE = 385;
const LEFT_CORNER_EYE = 362
const RIGHT_CORNER_EYE = 263
const TOP_RIGHT_EYE = 386
const BOTTOM_RIGHT_EYE = 374

function preload() {
    narutoImage = loadImage("assets/naruto_headband.png");
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    let facemesh = ml5.facemesh(video,() => {
        console.log("Model is ready");
        modelIsLoading = false;
    });

    facemesh.on("predict", (results) => {
        //console.log(results[0]);
        latestPrediction = results[0]
        
    })
    
    

    

    video.hide();

    
}



function draw() {
    // if (modelIsLoading)
    // show a loading screen
    // draw webcam video
    //let flippedVideo = ml5.flipImage(video);
    imageMode(CORNER);
    image(video, 0, 0, width, height);
   
    //-----------------------------------
    if (latestPrediction == null) return; // don't draw anything else
    // get forhead locations
    let foreheadLocation = latestPrediction.scaledMesh[FOREHEAD_POINT];
    let leftForeheadLocation = latestPrediction.scaledMesh[LEFT_FOREHEAD];
    let rightForeheadLocation = latestPrediction.scaledMesh[RIGHT_FOREHEAD];
    let foreheadWidth = dist(
      leftForeheadLocation[0 /* x */],
      leftForeheadLocation[1 /* y */],
      rightForeheadLocation[0 /* x */],
      rightForeheadLocation[1 /* y */]
    );

    //get lip locations
    let upperLipLocation = latestPrediction.scaledMesh[UPPERLIP_POINT];
    let bottomLipLocation = latestPrediction.scaledMesh[BOTTOMLIP_POINT];

    let lipWidth = dist(upperLipLocation[0],upperLipLocation[1],bottomLipLocation[0],bottomLipLocation[1])
    //console.log(lipWidth)
    
    // let leftCornerEyeLocation = latestPrediction.scaledMesh[LEFT_CORNER_EYE]
    // let rightCornerEyeLocation = latestPrediction.scaledMesh[RIGHT_CORNER_EYE]
    // let distanceEyeWidth = dist(leftCornerEyeLocation[0],leftCornerEyeLocation[1],rightCornerEyeLocation[0], rightCornerEyeLocation[1])

    // let topRightEyeLocation = latestPrediction.scaledMesh[TOP_RIGHT_EYE]
    // let bottomRightEyeLocation = latestPrediction.scaledMesh[BOTTOM_RIGHT_EYE]
    // let distanceEyeHeight= dist(topRightEyeLocation[0],topRightEyeLocation[1],bottomRightEyeLocation[0], bottomRightEyeLocation[1])
    // console.log(distanceEyeHeight)

    // let rightEyeLocation = latestPrediction.scaledMesh[RIGHT_EYE];
    // noStroke();
    // fill(255, 144, 33,150);
    // ellipse(rightEyeLocation[0] + 2, rightEyeLocation[1] + 5,distanceEyeWidth,distanceEyeHeight);

    // circle(rightEyeLocation[0] + 2, rightEyeLocation[1] + 5,20);
    // noStroke();
    // fill(255, 144, 33,100);
    //event
    if(lipWidth > 15){
    
        

      strokeWeight(4)
      whisker(LEFT_UPPERCHEEK_POINT1,LEFT_UPPERCHEEK_POINT2);
      whisker(LEFT_MIDDLECHEEK_POINT1, LEFT_MIDDLECHEEK_POINT2);
      whisker(LEFT_BOTTOMCHEEK_POINT1, LEFT_BOTTOMCHEEK_POINT2);
      whisker(RIGHT_UPPERCHEEK_POINT1, RIGHT_UPPERCHEEK_POINT2);
      whisker(RIGHT_MIDDLECHEEK_POINT1,RIGHT_MIDDLECHEEK_POINT2);
      whisker(RIGHT_BOTTOMCHEEK_POINT1, RIGHT_BOTTOMCHEEK_POINT2);

    
      
    


      
    }
    
    let narutoWidth = foreheadWidth * 3.2;
    let narutoHeight = (narutoImage.height / narutoImage.width) * narutoWidth;
    imageMode(CENTER);
    // translate(foreheadLocation[0 /* x */], foreheadLocation[1 /* y */] - narutoHeight / 9)
    image(
      narutoImage,
      foreheadLocation[0 /* x */],
      foreheadLocation[1 /* y */] - narutoHeight / 9,
      narutoWidth /* width */,
      narutoHeight /* height */
    );

    

    
  }

  function whisker(upperCheekPoint,lowerCheekPoint){
    let bottomCheekLocation = latestPrediction.scaledMesh[lowerCheekPoint];
    let upperCheekLocation = latestPrediction.scaledMesh[upperCheekPoint];

    return line(upperCheekLocation[0], upperCheekLocation[1], bottomCheekLocation[0], bottomCheekLocation[1]);


  }



  
  