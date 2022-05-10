import React from 'react';
import './SortingVisualizer.css';
import { bubbleSort } from './SortingAlgorithms';

// class component - used state 
export default class SortingVisualizer extends React.Component {
    
    
    BAR_COLOR = '#FFF';
    SWAP_COLOR = '#BBB';

    //class properties
    constructor(props) {
        super(props);

        this.state = {
            size: 64,
            array: [],
            color: [],
            changes: [],
        }
    }

    //setup the class
    componentDidMount() {
        this.resetArray_flat();
        setTimeout(() => { this.resetArray_random();}, 1);
        setTimeout(() => { this.resetColor();}, 1);
        setTimeout(() => { this.createChanges();}, 1);

    }

    //-------------------------------------------------------------------------------------
    
    //reset the color of the bars
    resetColor() {
        let color = new Array(this.state.size).fill(this.BAR_COLOR);
        this.setState({color:color})
    }
    //reset height of bars to flat
    resetArray_flat() {
        let array = new Array(this.state.size).fill(0);
        this.setState({array:array})
    }
    //reset height of bars to random
    resetArray_random() {
        let array = new Array(this.state.size);
        for(let i=0;i<array.length;i++) {
            array[i]=Math.floor(Math.random() * (1000-10) +10)/10;;
        }
        this.setState({array:array});
    }
    //reset height of bars to worse case
    resetArray_worst() {
        let array = new Array(this.state.size);
        let size = this.state.size;
        for(let i=0;i<array.length;i++) {
            array[i] = (100-i*(100/size));
        } 
        this.setState({array:array});
    }
    //-------------------------------------------------------------------------------------
    
    //create a new series of steps to complete
    createChanges() {
        let changes = bubbleSort([...this.state.array]);
        let length = changes.length
        this.setState({changes:changes,numChanges:length})
    }
    //sort the current bars using bubble sort
    apply_bubbleSort() {
        let speed = (196/this.state.size)*5
        let numChanges = this.state.numChanges
        let i=0
        while (i<numChanges) {
            i++
            setTimeout(() => {this.apply_bubbleSort_step();}, i*speed);
            setTimeout(() => {this.resetColor();}, (i*speed)+(speed));
        }
        this.setState({numChanges:0})
    }
    //a single step in the bubble sort
    apply_bubbleSort_step() {
        let new_array = [...this.state.array];
        let new_color = [...this.state.color];
        let changes   = [...this.state.changes];

        [new_array[changes[0][0]], new_array[changes[0][1]]]  =  [new_array[changes[0][1]], new_array[changes[0][0]]];
        new_color[[changes[0][0]]] = this.SWAP_COLOR;
        new_color[[changes[0][1]]] = this.SWAP_COLOR;
        changes.shift();
        this.setState({array: new_array, color: new_color, changes:changes});
    }
    //-------------------------------------------------------------------------------------
    
    button_random() {
        setTimeout(() => { this.resetArray_random();}, 100);
        setTimeout(() => { this.resetColor();}, 100);
        setTimeout(() => { this.createChanges();}, 100);

    }

    button_worst() {
        setTimeout(() => { this.resetArray_worst();}, 100);
        setTimeout(() => { this.resetColor();}, 100);
        setTimeout(() => { this.createChanges();}, 100);
    }

    button_increase() {
        if(this.state.size<96){
            this.button_random();
            this.setState({size:this.state.size+8});
            this.button_random();
        }
    }
    
    button_decrease() {
        if(this.state.size>8) {
            this.button_random();
            this.setState({size:this.state.size-8});
            this.button_random()
        }
    }
    //-------------------------------------------------------------------------------------
    
    render() {
        const array = this.state.array;
        return (
            <div className='container'>

                <div className='menu'>
                    <div className='button-list'>
                        <button className='smallbtn' onClick={()=>this.button_decrease()}>-</button>
                        <button className='smallbtn' onClick={()=>this.button_increase()}>+</button>
                        <button className='btn' onClick={()=>this.button_random()}>Random</button>
                        <button className='btn' onClick={()=>this.button_worst()}>Worst</button>
                        <button onClick={()=>this.apply_bubbleSort()}>Sort</button>

                        

                    </div>
                </div>

                <div className='bars-array'>
                    {array.map((value,idx) => (
                        <div 
                            className='bar'
                            key={idx}
                            style={{background:`${(this.state.color[idx])}`,height:`${((value))}%`}}></div>
                    ))}
                </div> 
            </div> 
        )
    }

//-----------------------------------------------------------------------------------------
}
