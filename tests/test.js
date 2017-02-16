var jsivf = require('../src/jsivf.js');
var fs = require('fs');

//Create a new IVF demuxer
var ivf = new jsivf();

//Read in the first test vector
var vectorPath = 'vp8-test-vectors/';
var data = fs.readFileSync(vectorPath + 'vp80-00-comprehensive-001.ivf');


//Create a temp directory to dump test files
var dir = './tmp';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//Parse the header
ivf.receiveBuffer(data);
ivf.parseHeader();

//Dump each output frame
while(ivf.currentFrame < ivf.frameCount){
    var frameBuffer = ivf.processFrame();
    var filename = 'frame_' + ivf.currentFrame + '.bin';
    fs.writeFileSync(dir + '/' + filename, frameBuffer);
}

