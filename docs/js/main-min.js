function outerHeight(t){let e=t.offsetHeight,i=getComputedStyle(t);return e+=parseInt(i.marginTop)+parseInt(i.marginBottom)}function resize(){const t=window.innerHeight-cvs.offsetTop-Math.abs(outerHeight(cvs)-cvs.offsetHeight);cvs.outerHeight=t}const errorContainer=document.getElementById("error"),cvs=document.getElementById("cvs");window.addEventListener("resize",()=>{resize()},{passive:!0});class Picture{constructor(t){this.ctx=cvs.getContext("2d"),this.figures=[],this.x=null,this.y=null,this.beta=null,this.alpha=null,this.xPoint=document.getElementById("xPoint"),this.yPoint=document.getElementById("yPoint"),cvs.style.backgroundColor=t.backgorundColor,cvs.width=t.width,cvs.height=t.height,resize(),t.rectangles&&this.drawRectangles(t.rectangles),document.addEventListener("mousemove",t=>{this.moveObjects(t)},{passive:!0}),window.DeviceMotionEvent&&window.addEventListener("devicemotion",t=>{t.acceleration.x.toPrecision(3),t.acceleration.y.toPrecision(3);const e=t.rotationRate.beta.toPrecision(2),i=t.rotationRate.alpha.toPrecision(2);if(!this.beta&&!this.alpha)return this.beta=e,void(this.alpha=i);Math.abs(this.beta-e).toPrecision(2),Math.abs(this.alpha-i).toPrecision(2);this.xPoint.innerHTML=e,this.yPoint.innerHTML=i;const s=e,o=i;this.moveObjects({clientX:s,clientY:o,gyro:!0})},{passive:!0})}drawRectangles(t){t.forEach(t=>{this.figures.push(t),this.drawRectangle(t)})}drawRectangle(t){this.ctx.fillStyle=t.fillColor,t.rotate?(this.ctx.save(),this.ctx.translate(t.x+t.width/2,t.y+t.height/2),this.ctx.rotate(t.rotate*Math.PI/180),this.ctx.fillRect(-t.width/2,-t.height/2,t.width,t.height),this.ctx.restore()):this.ctx.fillRect(t.x,t.y,t.width,t.height)}moveObjects(t){if(!this.x&&!this.y)return this.x=t.clientX,void(this.y=t.clientY);const e=t.gyro?15:100;t.gyro?(this.figures=this.figures.map(i=>({x:i.x+(this.beta-t.clientX)*i.speed/e,y:i.y+(this.alpha-t.clientY)*i.speed/e,width:i.width,height:i.height,fillColor:i.fillColor,rotate:i.rotate?i.rotate:null,speed:i.speed})),this.beta=t.clientX,this.alpha=t.clientY):(this.figures=this.figures.map(i=>({x:i.x+(this.x-t.clientX)*i.speed/e,y:i.y+(this.y-t.clientY)*i.speed/e,width:i.width,height:i.height,fillColor:i.fillColor,rotate:i.rotate?i.rotate:null,speed:i.speed})),this.x=t.clientX,this.y=t.clientY),requestAnimationFrame(()=>this.redraw())}redraw(){this.ctx.clearRect(0,0,cvs.width,cvs.height),this.figures.forEach(t=>this.drawRectangle(t))}}const pictures=[{width:1243,height:2e3,backgorundColor:"#d2cec2",rectangles:[{x:200,y:400,width:550,height:550,fillColor:"#242424",rotate:null,speed:10},{x:530,y:1060,width:400,height:400,fillColor:"#a73a39",rotate:"-12",speed:20}]},{}];cvs.getContext?new Picture(pictures[0]):errorContainer.innerHTML="Your browser does not support canvas";