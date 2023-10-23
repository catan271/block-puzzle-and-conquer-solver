import { useState } from 'react';
import { defaultMap } from '../constants/default-map.constant';
import { Button, Modal } from 'antd';
import { CellStatus } from '../enums/cell-status.enum';
import { cloneDeep } from 'lodash';
import { getSolutions } from '../utils/get-solutions.util';
import { Loading } from '../components/loading/Loading';

interface DrawGridProps {
    hidden?: boolean;
    onSolved: (ans: Array<number[][]>) => void;
}

export const DrawGrid: React.FC<DrawGridProps> = ({ hidden = false, onSolved }) => {
    const [loading, setLoading] = useState(false);
    const [map, setMap] = useState({ data: cloneDeep(defaultMap) });

    const handleClickCell = (r: number, c: number) => {
        const { data } = map;
        if (data[r][c] === CellStatus.Blank) {
            data[r][c] = CellStatus.Selected;
        } else {
            data[r][c] = CellStatus.Blank;
        }
        setMap({ data });
    };

    const handleReset = () => {
        setMap({ data: cloneDeep(defaultMap) });
    };

    const handleSolve = async () => {
        try {
            setLoading(true);
            const ans = await getSolutions(map.data);
            onSolved(ans);
        } catch {
            Modal.error({
                title: 'No solution',
                content: 'Cannot find any feasible solution!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page" style={hidden ? { display: 'none' } : {}}>
            <Loading loading={loading} transparent />
            <div className="action">
                <Button onClick={handleReset}>Reset</Button>
                <Button type="primary" onClick={handleSolve}>
                    Solve
                </Button>
            </div>

            <div className="draw-container">
                <div className="draw-map">
                    {map.data.map((row, r) => (
                        <div className="row" key={r}>
                            {row.map((cell, c) => (
                                <div key={c} className={`cell ${cell}`} onClick={() => handleClickCell(r, c)}></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
