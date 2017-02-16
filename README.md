# jsivf
Ivf Demuxer - Lightweight demuxer to parse and read ivf files. Possibly upgrade later for usage in ogv.js

## Installation 
`npm -i jsivf`

The test vectors are hosted via git submodule.
To clone submodules use:
`
git submodule init
git submodule update
`

## Usage
```
var jsivf = require('../src/jsivf.js');
var ivf = new jsivf();

//Get some binary data

//Parse the header
ivf.receiveBuffer(data);
ivf.parseHeader();

//Dump each output frame
while(ivf.currentFrame < ivf.frameCount){
    var frameBuffer = ivf.processFrame();
    var filename = 'frame_' + ivf.currentFrame + '.bin';
    fs.writeFileSync(dir + '/' + filename, frameBuffer);
}
```

## Tests
`npm run-script test` Will read the first test vector and dump contents to tmp directory

`npm run-script clean` Removes test frames

