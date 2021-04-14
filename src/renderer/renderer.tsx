import * as React from 'react';
import { render } from 'react-dom';

function MainView()
{
  return (<h1>Hello, World!</h1>);
}

render(<MainView />, document.getElementById('root'));