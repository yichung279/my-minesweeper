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
    pos_i: number
    pos_j: number
    visited: boolean
    flaged: boolean
    show: MineShown | number
    mineAround: number
}