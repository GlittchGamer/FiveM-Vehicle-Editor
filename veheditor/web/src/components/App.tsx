import HandlingEditor from '@/pages/Editor/HandlingEditor';
import Sidebar from '@/pages/Sidebar/Sidebar';
import { debugData } from '@/utils/debugData';
import React from 'react';
import './App.css';
// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen  p-4 overflow-hidden">
      <div className="min-w-[530px] w-fit h-full flex flex-row">
        <Sidebar />
        <div className="flex flex-col p-2 bg-slate-800">
          <HandlingEditor />
        </div>
      </div>
    </div>
  );
};

export default App;
