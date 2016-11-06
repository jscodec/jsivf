"use strict";

class FlareIVF{
    
    constructor(){
        this.data = null;
        this.ptr = 0;
        this.signature;
        this.version;
        this.headerLength;
        this.codec;
        this.width;
        this.height;
        this.frameRate;
        this.timeScale;
        this.frameCount;
    }
    
    receiveBuffer(data){
        this.data = new Uint8Array(data);
    }
    
    process(){
        this.parseHeader();
    }
    
    parseHeader(){
        var temp0 = this.data[0];
        var temp1 = this.data[1];
        var temp2 = this.data[2];
        var temp3 = this.data[3];
        
        this.signature = String.fromCharCode(temp0, temp1, temp2, temp3);
        
        this.version = this.data[4] << 8 | this.data[5];
        this.headerLength = this.data[7] << 8 | this.data[6];
        
        temp0 = this.data[8];
        temp1 = this.data[9];
        temp2 = this.data[10];
        temp3 = this.data[11];
        
        this.codec = String.fromCharCode(temp0, temp1, temp2, temp3);
        this.width = this.data[13] << 8 | this.data[12];
        this.height = this.data[15] << 8 | this.data[14];
        this.frameRate = this.data[19] << 24 | this.data[18] << 16 | this.data[17] <<8 | this.data[16];
        this.timeScale = this.data[23] << 24 | this.data[22] << 16 | this.data[21] <<8 | this.data[20];
        this.frameCount = this.data[27] << 24 | this.data[26] << 16 | this.data[25] <<8 | this.data[24];
        
        console.log("Signature : " + this.signature);
        console.log("Version :" + this.version);
        console.log("Header Length :" + this.headerLength);
        console.log("Codec : " + this.codec);
        console.log("Width : " + this.width);
        console.log("Height : " + this.height);
        console.log("Frame rate : " + this.frameRate);
        console.log("Time scale : " + this.timeScale);
        console.log("Frame Count : " + this.frameCount);
    }
    
}

module.exports = FlareIVF;