
window.addEventListener('load', function(){
    const textInput = document.getElementById("textInput");

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = document.documentElement.clientWidth
    canvas.height = 300;

    var adjustmentx = 0;
    var adjustmenty = 50;

    class Particle {
        constructor(effect, x, y , color){
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = 0;
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap;
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.force = 0;
            this.angle = 0;
            this.distance = 0;
            this.friction = Math.random()* 0.6 + 0.15;
            this.ease = Math.random() * 0.1 + 0.005;

        }
        draw(){
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.dx = this.effect.mouse.x - this.x-adjustmentx; //adjust these values depending on position
            this.dy = this.effect.mouse.y - this.y-adjustmenty;
            this.distance = this.dx*this.dx + this.dy*this.dy;
            this.force = -this.effect.mouse.radius/this.distance;

            if (this.distance<this.effect.mouse.radius){
                this.angle = Math.atan2(this.dy,this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }

            this.x += (this.vx *= this.friction)+(this.originX - this.x)*(this.ease);
            this.y += (this.vy *= this.friction)+(this.originY - this.y)*(this.ease);


        }
    }
    
    class Effect{
        constructor(context, canvasWidth, canvasHeight){
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;

            if(document.documentElement.clientWidth>500){
                this.fontSize = 100;
            }
            else{

                this.fontSize = 30;
            }
            this.lineHeight = this.fontSize * 0;
            this.maxTextWidth = this.canvasWidth * 0.8;
            // this.textInput.addEventListener('keyup', (e) =>{
            //     if(e.key !== ' '){
            //         this.context.clearRect(0,0, this.canvasWidth, this.canvasHeight);
            //         this.wrapText(e.target.value)  
            //     } 
            // })
            //particle text
            this.particles = [];
            this.gap = 1;
            this.mouse = {
                radius: 100000,
                x: 0,
                y: 0
            }
            window.addEventListener('mousemove', (e) =>{
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            })

        }

        wrapText(text){
            const gradient = this.context.createLinearGradient(0,0,this.canvasWidth,this.canvasHeight);
            gradient.addColorStop(0.3,'white');
            gradient.addColorStop(0.5,'lightblue');
            gradient.addColorStop(0.7,'blue');
            this.context.fillStyle = gradient;
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.lineWidth = 0;
            // this.context.strokeStyle = 'white';
            this.context.font = this.fontSize + 'px Helvetica';

            //break multiple text
            let linesArray = [];
            let words = text.split(' ');
            let lineCounter = 0;
            let line = '';
            for (let i=0; i<words.length; i++){
                let testLine = line + words[i] + ' ';
                if (this.context.measureText(testLine).width > this.maxTextWidth){
                    line = words[i] + ' ';
                    lineCounter ++;
                } else{
                    line = testLine;

                }
                
                linesArray[lineCounter] = line;

            }
            let textHeight = this.lineHeight * lineCounter;
            this.textY = this.canvasHeight/2 - textHeight/2;

            linesArray.forEach( (el, index) =>{

                this.context.fillText(el,this.textX,this.textY + index*this.lineHeight);
                this.context.strokeText(el, this.textX, this.textY + index*this.lineHeight);
            });
            this.convertToParticles();

        }
        convertToParticles(){
            this.particles = [];
            const pixels = this.context.getImageData(0,0, this.canvasWidth, this.canvasHeight).data;
            this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
            for (let y=0; y<this.canvasHeight; y += this.gap){
                for (let x=0; x<this.canvasWidth; x+= this.gap){
                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];
                    if (alpha > 0){
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = 'rgb(' + red + ',' + green + ',' + blue+ ')'; 
                        this.particles.push(new Particle(this, x, y, color));
                    }
                }
            }

        }
        render(){

            this.particles.forEach( particle =>{
                particle.update();
                particle.draw();
            });

        }
    }

    const effect = new Effect(ctx, canvas.width,canvas.height);
    effect.wrapText("Hey, I'm Minhaz ...");
    effect.render();

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        effect.render();
        requestAnimationFrame(animate);
    }

    animate();



    var layoutboolean = true;

    document.querySelector(".avater").addEventListener('click',()=>{
        //naturaly hidden
        document.querySelector("#phoneview").classList.toggle('hidden');
        document.querySelector("#phoneview").classList.toggle('show');

        document.querySelector("#profilepicture").classList.toggle('margclose');
        document.querySelector("#profilepicture").classList.toggle('margshow');
        //For top buttons

        document.querySelector("#buttonsmade01").classList.toggle('margclose');
        document.querySelector("#buttonsmade01").classList.toggle('margshow');

        document.querySelector("#writtencontactinfo01").classList.toggle('writteninfoclose');
        document.querySelector("#writtencontactinfo01").classList.toggle('writteninfoopen');

        document.querySelector('#canvas1').classList.toggle('margclose01');
        document.querySelector('#canvas1').classList.toggle('margshow01');

        document.querySelectorAll('.boxtemplate').forEach(listelem =>{
            listelem.classList.toggle('margclose01')
        });
        document.querySelectorAll('.boxtemplate').forEach(listelem =>{
            listelem.classList.toggle('margshow01')
        });

        //boxtemplate

        if (document.querySelector('#canvas1').classList.contains('margclose01')){
            adjustmentx = 0;
        }
        else{
            adjustmentx = 180;
        }

        
        // if (layoutboolean) {
        //     document.getElementById("overallstructure").style.gridTemplateColumns = "0px 1fr";
        //     layoutboolean = false;
        // }
        // else{
        //     document.getElementById("overallstructure").style.gridTemplateColumns = "280px 1fr";
        //     layoutboolean = true;
        // }
    
    })


})

