import React from 'react';
import './SortingVisualizer.css';
import { bubbleSort } from './SortingAlgorithms';

// class component - used state 
class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);

        //initialise an empty array
        this.state = {
            array: [],
            size: 128,
        }
    }

    componentDidMount() {
        this.createArray();
        setTimeout(() => { this.applyRandom(); }, 200);

        
    }

    //-------------------------------------------------------------------------------------

    // create new array
    createArray() {
        const array = [];
        const numBars = this.state.size; //size
        for(let i=0; i<numBars;i++) {
            array.push(0);
        }
        this.setState({array:array})
    }

    //-------------------------------------------------------------------------------------

    // value -> single bar
    setBar(value,index) {
        let array = [...this.state.array];
        array[index] = value;
        this.setState({array:array})
    }



    // value -> entire array
    setArray_flat(value) {
        let array = [...this.state.array];
        for(let i=0;i<array.length;i++) {
            array[i]=value;
        }
        this.setState({array:array});
    }

    // value -> entire array 
    setArray_flat_wave(value) {
        for(let i=0;i<this.state.size;i++)
        {
            setTimeout(() => { this.setBar(value,i);}, i*2);
        }
    }

    //-------------------------------------------------------------------------------------

    applyRandom() {
        let array = [...this.state.array];
        for(let i=0;i<array.length;i++) {
            array[i]=Math.floor(Math.random() * (1000-10+1) +10);;
        }
        this.setState({array:array})
    }

    applyMin() {
        this.setArray_flat(10)
    }

    applyMax() {
        this.setArray_flat(1000)
    }

    applyBestCase() {
        let array = [...this.state.array];
        let size = this.state.size;
        for(let i=0;i<array.length;i++) {
            array[i] = (i*(1000/size))+(1000/size);
        } 
        this.setState({array});
    }

    applyWorstCase() {
        let array= [...this.state.array];
        let size = this.state.size;
        for(let i=0;i<array.length;i++) {
            array[i] = 1000-i*(1000/size);
        } 
        this.setState({array});
    }

    //-------------------------------------------------------------------------------------

    apply_bubbleSort() {
        let old_array = [...this.state.array];
        let changes = bubbleSort([...old_array]);
        let num_passes = 0;
        let num_swaps = 0;


        for(let i=0;i<changes.length;i++) {
            if (changes[i] == 'p') {
                num_passes++;
            } else {
                num_swaps++;
                [old_array[changes[i][0]], old_array[changes[i][1]]]  =  [old_array[changes[i][1]], old_array[changes[i][0]]];

            }
        }

        this.setState({array: old_array})
    }


    /*function animate_bubble(old_array) {
        let [bubble_array, changes] = bubbleSort([...old_array]);
        let num_passes = 0;
        let num_changes = 0;
        
        console.log(changes);
        for (let i=0;i<changes.length;i++) {
            if (changes[i] == 'p') {
                num_passes++;
                console.log(num_passes);
            } else {
                num_changes++;
                [old_array[changes[i][0]], old_array[changes[i][1]]] = [old_array[changes[i][1]], old_array[changes[i][0]] ];
                console.log(num_changes+': '+old_array);
            }   
    
        }
    }*/

    //-------------------------------------------------------------------------------------
    render() {
        const array = this.state.array;
        return (
            <div className='container'>

                <div className='menu'>
                    <div className='button-list'>
                        <button className='btn' onClick={()=>this.applyRandom()}>Random</button>
                        <button className='btn' onClick={()=>this.applyWorstCase()}>Worst</button>
                        <button  onClick={()=>this.apply_bubbleSort()}>Bubble Sort</button>
                    </div>
                </div>

                <div className='bars-array'>
                    {array.map((value,idx) => (
                        <div 
                            className='bar'
                            key={idx}
                            style={{height:`${((value)/10.0)}%`}}></div>
                    ))}
                </div> 
            </div> 
        )
    }

//-----------------------------------------------------------------------------------------
}


function randomIntFromInterval(min, max) {
    return 
}

export default SortingVisualizer;