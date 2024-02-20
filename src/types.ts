/* eslint no-unused-vars: 0 */
export enum GameStatus {
    UNBEGUN = 'unbegun',
    INPROGRESS = 'in progress',
    WIN = 'WIN',
    LOSE = 'LOSE'
}

export enum MineShown {
    FLAG = 'flag',
    BOMB = 'bomb',
    MINE_AROUND = 'mineAround',
    NONE = '',
}

export interface Mine {
    mine: boolean
    visited: boolean
    flagged: boolean
    mineAround: number
}