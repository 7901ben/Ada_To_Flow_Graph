var x;
var text;    // split according to lines  ,,, each line stored as an array element 
var leaderTracker ;   // tracks the leader code 
var removeSpaceText  ;  // spaces are removed to display in flowgraph
var z = 0;  // in fillingText()
var t;    // in filling text()
//canvas 
var numRect = 0;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();

function getText() {
     x = document.getElementById("textArea").value;
     text = x.split("\n");
     t = text.length;
     leaderTracker =  new Array(text.length).fill(0);    //fill array with 0 

     findLeader();
     countRect();
    
    
     draw();

   // alert(text);

    

  }
 

function findLeader(){ // finds leader statement 
      
      // 1st line is a leader 
     leaderTracker[0]=1;
   
     //Statement that is a target of the conditional or unconditional goto statement
     for(var i=0;i<text.length;i++){

      if(text[i].search("for")>=0)
      leaderTracker[i]=1;


      // Statement that appears immediately after a goto statement  is leader
      if(i==text.length-1)
      break;
      if(text[i].search("end")>=0 )
      leaderTracker[i+1]=1;

     }
     

}


function countRect(){  // count number of leader statements to assign blocks
   for(var i =0;i<leaderTracker.length;i++){
         if(leaderTracker[i]==1)
         numRect++;
   }

}


function draw(){         
   var a=500 ,b=-100;


for(var i=0;i<numRect;i++){
b += 150;
ctx.rect(a, b, 400, 100);

fillingText(a,b);

ctx.stroke();
drawArrow(ctx, a+200, b+100, a+200, b+150 , 3 , 'black');
//             x1  y1  x2   y2  thickness
}

   



}



function fillingText(a,b){
 
   var c=0;
    var i=10;
    
    ctx.fillText(text[z], a+10, b+10);
    z++;
    //t--;
   while (t){
     
   ctx.fillText(text[z], a+10, b+10+i);
    z++;
    
    if(leaderTracker[z]==1){
      break;
    }
   
    if(t==1){
      alert("not breaking ")
      
    }
    
     i+=10
     t--;
   }

}



// arrow code 
function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
 
    ctx.save();
    ctx.strokeStyle = color;
 
    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
 
    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
               toy-headlen*Math.sin(angle+Math.PI/7));
 
    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}


/* with Ada.Text_IO; use Ada.Text_IO;

procedure Greet_5a is
begin
   for I in 1 .. 5 loop
      --  Put_Line is a procedure call
      Put_Line ("Hello, World!" & Integer'Image (I));
      
   end loop;
end Greet_5a;  */

