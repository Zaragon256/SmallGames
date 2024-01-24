import React, { Component } from "react";


class AnimatedObject {
    constructor(frames) {
        this.frames = frames;
        this.currentFrameIndex = 0;
    }

    getCurrentFrame() {
        return this.frames[this.currentFrameIndex];
    }

    nextFrame() {
        this.currentFrameIndex = (this.currentFrameIndex + 1) > this.frames.length - 1 ? 0 : this.currentFrameIndex + 1 ;
    }
}

class Maze extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.animationFrame = null;

        this.state = {
            isAnimating: false,
            grid: [],
            initTime: Date.now(),
            activeScreen: "screen1",
            count1000ms: 0,
            count800ms: 0,
            count500ms: 0,
        };

         // Create an instance of AnimatedObject for the O animation
         this.oAnimation = new AnimatedObject(["O", "o", "-", "o"]);
    }

    componentDidMount() {
        this.initializeCanvas();
        this.initializeGrid();
    }

    componentWillUnmount() {
        this.stopAnimation();
    }

    initializeCanvas = () => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
      
        // Set canvas size
        canvas.width = 800;
        canvas.height = 500;
      
        
      };

      initializeGrid = () => {
        const rows = 50; // Number of rows
        const cols = 80; // Number of columns
        const grid = [];
    
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < cols; j++) {
            // Random letter generation (A-Z)
            const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            row.push(randomLetter);
          }
          grid.push(row);
        }
    
        this.setState({ grid });
      };

    startAnimation = () => {
        if (!this.state.isAnimating) {
            this.setState({ isAnimating: true }, this.animate);
        }
        this.setState({ initTime: Date.now() });
    };

    stopAnimation = () => {
        cancelAnimationFrame(this.animationFrame);
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.setState({ isAnimating: false });
    };

    restartAnimation = () => {
        if (!this.state.isAnimating) {
            this.setState({ isAnimating: true }, this.animate);
        }
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.setState({ initTime: Date.now(), activeScreen: this.state.activeScreen ==="screen1"?"screen2":"screen1" });
    };

    animate = () => {
        
        if(this.state.activeScreen === "screen1"){
            this.screen1();
        }else{
            this.screen2();
        }
        
        // Call animate recursively if still animating
        if (this.state.isAnimating) {
            this.animationFrame = requestAnimationFrame(this.animate);
        }

    };


    /** Screens */
    screen1 = () =>{
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Animation logic here
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        const gridSize = 10;
        ctx.strokeStyle = "#ddd"; // Set grid color
        ctx.font = "9px serif";
        ctx.fillStyle = '#fff';
        // ctx.fillText("Hello world", 10, 50);//x,y->0,0 starting on top-left
        // console.log(this.state.grid.length,this.state.grid[0].length);
        this.state.grid.forEach((array,y) => {
            array.forEach((val,x) => {
                //console.log("val:" + val + " (x:" + x + " y:" + y + ")");
                ctx.fillText(val, x * gridSize , y * gridSize);//x,y->0,0 starting on top-left
            });
        });
        // console.log("---------------------- cycle complete ---------------------");

        // for (let x = 0; x <= canvas.width; x += gridSize) {
        //   ctx.beginPath();
        //   ctx.moveTo(x, 0);
        //   ctx.lineTo(x, canvas.height);
        //   ctx.stroke();
        // }
        // for (let y = 0; y <= canvas.height; y += gridSize) {
        //   ctx.beginPath();
        //   ctx.moveTo(0, y);
        //   ctx.lineTo(canvas.width, y);
        //   ctx.stroke();
        // }

        // Update canvas content
        ctx.font = "48px serif";
        ctx.fillText(((Date.now() - this.state.initTime) / 1000), 10, 50);

        ctx.font = "48px serif";
        ctx.fillText(Math.trunc((Date.now() - this.state.initTime) / 800), 10, 100);

        // Get the current frame from the O animation and draw it
        const currentFrame = this.oAnimation.getCurrentFrame();
        ctx.font = "48px serif";
        ctx.fillText(currentFrame, canvas.width / 2, canvas.height / 2);

        // Move to the next frame every 500ms
        if (Math.trunc((Date.now() - this.state.initTime) / 500) > this.state.count500ms) {
            this.setState({ count500ms: this.state.count500ms + 1});
            //this.oAnimation.nextFrame();
            console.log("count500ms",this.state.count500ms + 1);
        }

        // Move to the next frame every 800ms
        if (Math.trunc((Date.now() - this.state.initTime) / 800) > this.state.count800ms) {
            this.setState({ count800ms: this.state.count800ms + 1});
            this.oAnimation.nextFrame();
            console.log("count800ms",this.state.count800ms + 1);
        }

        // Move to the next frame every 1000ms
        if (Math.trunc((Date.now() - this.state.initTime) / 1000) > this.state.count1000ms) {
            this.setState({ count1000ms: this.state.count1000ms + 1});
            //this.oAnimation.nextFrame();
            console.log("count1000ms",this.state.count1000ms + 1);
        }

    }

    screen2 = () => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "48px serif";
        ctx.fillText(("Combat screen"), 10, 50);
    }


    render() {
        console.log("render");

        return (
            <>
                <div>
                    <h1>Maze</h1>
                    <canvas ref={this.canvasRef}></canvas>
                    <div>
                        <button onClick={this.startAnimation}>Start</button>
                        <button onClick={this.stopAnimation}>Stop</button>
                        <button onClick={this.restartAnimation}>Restart</button>
                    </div>
                </div>
            </>
        );
    }
}

export default Maze