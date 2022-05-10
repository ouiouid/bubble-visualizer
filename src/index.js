import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';

ReactDOM.render(
  <div>
      <Helmet>
    <title>Sorting Visualizer</title>
    <link rel="icon" type="image/png" href="icon.png" sizes="16x16" />
  </Helmet>
    <SortingVisualizer/>
  </div>
, document.getElementById('root')
)