/*TC.on('touch', t=>{ 
    g.clear();
    g.drawString("touched:\nX:" + t.x + "\nY:"+ t.y,240,240,true);
                                      });
  
*/

//keyboard ble stuff
Modules.addCached("ble_hid_keyboard",function(){exports.report=new Uint8Array([5,1,9,6,161,1,5,7,25,224,41,231,21,0,37,1,117,1,149,8,129,2,149,1,117,8,129,1,149,5,117,1,5,8,25,1,41,5,145,2,149,1,117,3,145,1,149,6,117,8,21,0,37,115,5,7,25,0,41,115,129,0,9,5,21,0,38,255,0,117,8,149,2,177,2,192]);exports.MODIFY={CTRL:1,SHIFT:2,ALT:4,GUI:8,LEFT_CTRL:1,LEFT_SHIFT:2,LEFT_ALT:4,LEFT_GUI:8,RIGHT_CTRL:16,RIGHT_SHIFT:32,RIGHT_ALT:64,RIGHT_GUI:128};exports.KEY={A:4,B:5,C:6,D:7,E:8,F:9,G:10,H:11,I:12,J:13,K:14,L:15,M:16,N:17,O:18,
P:19,Q:20,R:21,S:22,T:23,U:24,V:25,W:26,X:27,Y:28,Z:29,1:30,2:31,3:32,4:33,5:34,6:35,7:36,8:37,9:38,0:39,ENTER:40,"\n":40,ESC:41,BACKSPACE:42,"\t":43," ":44,"-":45,"=":46,"[":47,"]":48,"\\":49,NUMBER:50,";":51,"'":52,"~":53,",":54,".":55,"/":56,CAPS_LOCK:57,F1:58,F2:59,F3:60,F4:61,F5:62,F6:63,F7:64,F8:65,F9:66,F10:67,F11:68,F12:69,PRINTSCREEN:70,SCROLL_LOCK:71,PAUSE:72,INSERT:73,HOME:74,PAGE_UP:75,DELETE:76,END:77,PAGE_DOWN:78,RIGHT:79,LEFT:80,DOWN:81,UP:82,NUM_LOCK:83,PAD_SLASH:84,PAD_ASTERIX:85,
PAD_MINUS:86,PAD_PLUS:87,PAD_ENTER:88,PAD_1:89,PAD_2:90,PAD_3:91,PAD_4:92,PAD_5:93,PAD_6:94,PAD_7:95,PAD_8:96,PAD_9:97,PAD_0:98,PAD_PERIOD:99};exports.tap=function(b,c,a){NRF.sendHIDReport([c,0,b,0,0,0,0,0],function(){NRF.sendHIDReport([0,0,0,0,0,0,0,0],function(){a&&a()})})}});
let kb = require("ble_hid_keyboard");
NRF.setServices(undefined, { hid : kb.report });


// end of ble stuff


// draw keyboard and handle presses

g.clear();
Graphics.prototype.setFont7x11Numeric7Seg = function() {
  this.setFontCustom(atob("ACAB70AYAwBgC94AAAAAAAAAAB7wAAPQhhDCGELwAAAAhDCGEMIXvAAeACAEAIAQPeAA8CEMIYQwhA8AB70IYQwhhCB4AAAIAQAgBAB7wAHvQhhDCGEL3gAPAhDCGEMIXvAAe9CCEEIIQPeAA94EIIQQghA8AB70AYAwBgCAAAAHgQghBCCF7wAHvQhhDCGEIAAAPehBCCEEIAAAAA=="), 46, atob("AgAHBwcHBwcHBwcHAAAAAAAAAAcHBwcHBw=="), 11);
};

var DEFAULT_SELECTION = '0';

var COLORS = {
  // [normal, selected]
  DEFAULT: ['#7F8183', '#A6A6A7'],
  OPERATOR: ['#F99D1C', '#CA7F2A'],
  SPECIAL: ['#65686C', '#7F8183']
};

function f(xy){return (67+Math.floor(xy*4/3));}

var keys = {
  'Z': {
    xy: [0, 160, 60, 200]
  },
  'X': {
    xy: [60, 160, 120, 200]
  },
  'C': {
    xy: [120, 160, 180, 200]
  },
  'A': {
    xy: [0, 120, 60, 160]
  },
  'S': {
    xy: [60, 120, 120, 160]
  },
  'D': {
    xy: [120, 120, 180, 160]
  },
  'Q': {
    xy: [0, 80, 60, 120]
  },
  'W': {
    xy: [60, 80, 120, 120]
  },
  'E': {
    xy: [120, 80, 180, 120]
  },
  'TEST':{
    xy: [0,0,60,40]
  }
};


function drawKey(name, k, selected) {
    var color = k.color || COLORS.DEFAULT;
    g.setColor(color[selected ? 1 : 0]);
    g.setFont('Vector', 28);
    g.fillRect(f(k.xy[0]), f(k.xy[1]), f(k.xy[2]), f(k.xy[3]));
    g.setColor(-1);
    var xc = f(k.xy[0]+(k.xy[2]-k.xy[0])/2);
    var yc = f(k.xy[1]+(k.xy[3]-k.xy[1])/2);
    g.setFontAlign(0,0).drawString(k.val || name, xc, yc);
  }

function isPressed(k,p) {
    var xy = keys[k].xy;
    if (p.x>f(xy[0]) && p.y>f(xy[1]) && p.x<f(xy[2]) && p.y<f(xy[3])) {
       drawKey(k, keys[k], true);
       setTimeout(()=>{drawKey(k, keys[k], false);},200);
       selected=k;
       return true;
    }
    return false;
 }

function buttonPress(val) {
  
  let keyToPress = val.toString();
  switch (val) {
    case 'W':
      kb.tap(kb.KEY.keyToPress,0);
      break;
    case 'A':
      kb.tap(kb.KEY.A,0);
      break;
    default:
      break;
  }
}



 
 TC.on("touch",(p)=> {
   for (var k in keys)
     if (isPressed(k,p))
        buttonPress(k.toString());
        console.log(k.toString());
 });

 function initdraw(){
    for (var k in keys) drawKey(k, keys[k], false);
    g.setFont('7x11Numeric7Seg', 3.7);
    g.drawString('0', f(205), f(10));
  }
  
  setTimeout(initdraw,1000);
  
  
  
