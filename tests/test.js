var FlareIVF = require('../src/FlareIVF.js');
var fs = require('fs');

//Create a new IVF demuxer
var ivf = new FlareIVF();

//Read in the first test vector
var vectorPath = 'vp8-test-vectors/';
var data = fs.readFileSync(vectorPath + 'vp80-00-comprehensive-001.ivf');




ivf.receiveBuffer(data);
ivf.process();