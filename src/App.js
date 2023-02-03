import './App.css';
import { Radio } from 'antd';
import TextBox from './components/TextBox';
import Tags from './components/Tags';

import { NERProvider } from './context/NERContext';

function App() {
  return (
    <div className="App">
      <NERProvider>
        <Tags />
        <TextBox />
      </NERProvider>
    </div>
  );
}

export default App;
