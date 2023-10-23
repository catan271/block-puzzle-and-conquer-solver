import { Button } from 'antd';
import { useState } from 'react';

interface SolutionProps {
    solutions?: Array<number[][]>;
    onBack: () => void;
}

export const Solution: React.FC<SolutionProps> = ({ solutions, onBack }) => {
    if (!solutions) return <></>;

    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex((index) => (index + 1) % solutions?.length);
    };
    console.log(solutions);

    return (
        <div className="page">
            <div className="action">
                <Button onClick={onBack}>Back</Button>
                <Button type="primary" onClick={handleNext}>
                    Next
                </Button>
            </div>

            <div className="draw-container">
                <div className="draw-map">
                    {solutions[index].map((row, r) => (
                        <div className="row" key={r}>
                            {row.map((cell, c) => (
                                <div key={c} className={`cell piece-${cell}`}></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
