import { CellStatus } from '../enums/cell-status.enum';

export const defaultMap = [...Array(50)].map(() => [...Array(50)].map(() => CellStatus.Blank));
