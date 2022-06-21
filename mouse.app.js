Modules.addCached("ble_hid_mouse",function(){exports.report=new Uint8Array([5,1,9,2,161,1,9,1,161,0,5,9,25,1,41,3,21,0,37,1,149,3,117,1,129,2,149,1,117,5,129,1,5,1,9,48,9,49,9,56,21,129,37,127,117,8,149,3,129,6,192,9,60,5,255,9,1,21,0,37,1,117,1,149,2,177,34,117,6,149,1,177,1,192]);exports.BUTTONS={NONE:0,LEFT:1,RIGHT:2,MIDDLE:4};exports.send=function(b,c,d,a){NRF.sendHIDReport([d,b,c,0,0,0,0,0],function(){NRF.sendHIDReport([0,0,0,0,0,0,0,0],function(){a&&a()})})}});
Modules.addCached("ble_hid_mouse",function(){exports.report=new Uint8Array([5,1,9,2,161,1,9,1,161,0,5,9,25,1,41,3,21,0,37,1,149,3,117,1,129,2,149,1,117,5,129,1,5,1,9,48,9,49,9,56,21,129,37,127,117,8,149,3,129,6,192,9,60,5,255,9,1,21,0,37,1,117,1,149,2,177,34,117,6,149,1,177,1,192]);exports.BUTTONS={NONE:0,LEFT:1,RIGHT:2,MIDDLE:4};exports.send=function(b,c,d,a){NRF.sendHIDReport([d,b,c,0,0,0,0,0],function(){NRF.sendHIDReport([0,0,0,0,0,0,0,0],function(){a&&a()})})}});
let mouse = require("ble_hid_mouse");
NRF.setServices(undefined, { hid : mouse.report });
let canRC = true;
let cooldown = 3;
/*
function btnPressed() {
  mouse.send(110,110,mouse.BUTTONS.LEFT); // X movement, Y movement, buttons pressed
}

// trigger btnPressed whenever the button is pressed
setWatch(btnPressed, BTN2, {edge:"rising",repeat:true,debounce:50});
*/




TC.on('touch', t=>{
    g.clear();
    g.drawString("click",240,240,true);
    mouse.send(0,0,mouse.BUTTONS.LEFT);
                                      });


TC.on('swipe', s=>{
  //up
  if(s == 2){
     g.drawString("swipe up",240,240,true);
    mouse.send(0,-100,0);}
  //down
  else if (s == 1){
    g.drawString("swipe sdown",240,240,true);
    mouse.send(0,100,0);}
  //left
  else if (s == 3){
     g.drawString("swipe left",240,240,true);
    mouse.send(-100,0,0);}
  //right
  else if (s == 4){
     g.drawString("swipe right",240,240,true);
    mouse.send(100,0,0);}
});


function cdTimer(){
  cooldown--;
  if(cooldown == 0){
    canRC = true;
    cooldown = 3;
  }
  else{setTimeout(cdTimer,1000);}
}

TC.on('longtouch',lt=>{
  if(canRC){
    canRC=false;
    mouse.send(0,0,mouse,BUTTONS.RIGHT);
    cdTimer();
    }
  else{g.drawString("rc on cd",240,240,true);}
});