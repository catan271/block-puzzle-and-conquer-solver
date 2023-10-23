import { useState } from 'react';
import { DrawGrid } from './pages/DrawGrid';
import { Solution } from './pages/Solution';

function App() {
    const [solutions, setSolutions] = useState<Array<number[][]>>();

    const handleSolved = (ans: Array<number[][]>) => {
        setSolutions(ans);
    };

    const handleBack = () => {
        setSolutions(undefined);
    };

    return (
        <div id="app">
            <DrawGrid hidden={!!solutions} onSolved={handleSolved} />
            <Solution solutions={solutions} onBack={handleBack} />
        </div>
    );
}

export default App;
