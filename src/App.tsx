import React, {useEffect, useState, useRef, MouseEvent} from 'react';
import './App.css';

interface IRectangle{
	startPointX: number;
	startPointY: number;
	width: number;
	height: number;
}

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [isDrawing, setIsDrawing] = useState(false);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>();
	const [rectCoordinates, setRectCoordinates] = useState<IRectangle>({startPointX: -1, startPointY: -1, width: -1, height: -1});

	useEffect(() => {
		const canvas = canvasRef?.current;
		if(canvas){
			canvas.width = 800;
			canvas.height = 600;
			setContext(canvas?.getContext('2d'));
		}
	},[]);

	useEffect(() => {
		if(rectCoordinates.width !== -1 && rectCoordinates.height !== -1){
			if(context){				
				context.lineWidth = 2;
				context.strokeStyle = 'black';
        context.beginPath();
				context.rect(rectCoordinates.startPointX, rectCoordinates.startPointY, rectCoordinates.width, rectCoordinates.height);
				context.stroke();
			}
		}
	}, [rectCoordinates]);

	const startShape = (e:MouseEvent) => {
		setIsDrawing(true);
		let pointX:number = e.pageX - e.currentTarget.getBoundingClientRect().left;
		let pointY:number = e.pageY - e.currentTarget.getBoundingClientRect().top;

		setRectCoordinates({startPointX: pointX, startPointY: pointY, width: -1, height: -1});
		console.log('click '+pointX+' '+pointY);
		console.log(rectCoordinates);
		
	}
	
	const drawShape = (e:MouseEvent) => {
		if(isDrawing){
			let width:number = e.pageX - e.currentTarget.getBoundingClientRect().left - rectCoordinates.startPointX;
			let height:number = e.pageY - e.currentTarget.getBoundingClientRect().top - rectCoordinates.startPointY;
			if(context){			
        context.clearRect(0,0,800,600);
				context.lineWidth = 2;
				context.strokeStyle = 'black';
        context.beginPath();
				context.rect(rectCoordinates.startPointX, rectCoordinates.startPointY, width, height);
				context.stroke();
			}
		}
	}
	
	const endShape = (e:MouseEvent) => {
		setIsDrawing(false);
		let width:number = e.pageX - e.currentTarget.getBoundingClientRect().left - rectCoordinates.startPointX;
		let height:number = e.pageY - e.currentTarget.getBoundingClientRect().top - rectCoordinates.startPointY;

		console.log('click '+width+' '+height);
		setRectCoordinates(rect => { 
			return {...rect, width: width, height: height}
		});
		console.log('release');
		console.log(rectCoordinates);
	}

  return (
    <div className="App">
      <canvas className="container" ref={canvasRef} onMouseDown={startShape} onMouseMove={drawShape} onMouseUp={endShape} />
    </div>
  );
}

export default App;
