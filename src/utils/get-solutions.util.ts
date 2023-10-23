import { cloneDeep } from 'lodash';
import { ajdDirections } from '../constants/adj-directions.constant';
import { CellStatus } from '../enums/cell-status.enum';
import { Piece } from '../types/piece.type';

export const getSolutions = (map: CellStatus[][]): Promise<Array<number[][]>> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const m = map.length;
            const n = map[0].length;
            let cnt = 0;
            const pieces: Piece[] = [];
            const visited = [...Array(m)].map(() => [...Array(n)].map(() => false));

            const dfs = (i: number, j: number, x: number, y: number) => {
                cnt++;
                const ans: Piece = {
                    x,
                    y,
                    adjacents: [],
                };
                for (const [dx, dy] of ajdDirections) {
                    const _i = i + dx;
                    const _j = j + dy;
                    if (map[_i]?.[_j] === CellStatus.Selected) {
                        if (visited[_i][_j]) continue;
                        visited[_i][_j] = true;
                        ans.adjacents.push(dfs(_i, _j, dx, dy));
                    }
                }

                return ans;
            };
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    if (visited[i][j]) continue;
                    visited[i][j] = true;
                    if (map[i][j] === CellStatus.Selected) {
                        pieces.push(dfs(i, j, 0, 0));
                    }
                }
            }

            const used = pieces.map(() => false);
            const ans: Array<number[][]> = [];
            let solution: number[][];
            const checkValid = (i: number, j: number, piece: Piece) => {
                if (solution[i]?.[j] === 0) {
                    for (const p of piece.adjacents) {
                        if (!checkValid(i + p.x, j + p.y, p)) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            };
            const drawPiece = (i: number, j: number, piece: Piece, index: number) => {
                solution[i][j] = index;
                for (const p of piece.adjacents) {
                    drawPiece(i + p.x, j + p.y, p, index);
                }
            };
            const undrawPiece = (i: number, j: number, piece: Piece) => {
                solution[i][j] = 0;
                for (const p of piece.adjacents) {
                    undrawPiece(i + p.x, j + p.y, p);
                }
            };
            const tryPiece = (i: number, j: number, index: number) => {
                if (index > pieces.length) {
                    ans.push(cloneDeep(solution));
                    return;
                }
                while (solution[i][j] > 0) {
                    j++;
                    if (j == solution[i].length) {
                        j = 0;
                        i++;
                    }
                }
                for (let n = 0; n < pieces.length; n++) {
                    const piece = pieces[n];
                    if (!used[n]) {
                        if (checkValid(i, j, piece)) {
                            used[n] = true;
                            drawPiece(i, j, piece, index);
                            tryPiece(i, j, index + 1);
                            undrawPiece(i, j, piece);
                            used[n] = false;
                        }
                    }
                }
            };
            for (let h = 1; h < cnt; h++) {
                if (cnt % h === 0) {
                    const w = cnt / h;
                    solution = [...Array(h)].map(() => [...Array(w)].map(() => 0));
                    tryPiece(0, 0, 1);
                }
            }
            if (ans.length) {
                resolve(ans);
            }
            reject();
        }, 1);
    });
};
