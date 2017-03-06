"use strict";

class JsIvf{
    
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
        this.currentFrame = 0;
    }
    
    receiveBuffer(data){
        this.data = new Uint8Array(data);
    }
    
    processFrame() {
        
        //console.log("Frame Number : " + this.currentFrame);
        var frameSize = this.data[this.ptr];
        frameSize |= this.data[this.ptr + 1] << 8;
        frameSize |= this.data[this.ptr + 2] << 16;
        frameSize |= this.data[this.ptr + 3] << 24;


        this.ptr += 12; //consume frame header
        var frameBuffer = this.data.subarray(this.ptr, this.ptr + frameSize);
        //console.log("Frame Size : " + frameSize);

        this.ptr += frameSize; //consume frame data
        this.currentFrame++;
        return frameBuffer;
        
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
        
        this.ptr = this.headerLength;
    }
    
}

module.exports = JsIvf;