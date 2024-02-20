/* eslint no-unused-vars: 0 */
// TODO: fix unused-vars
export enum GameStatus {
    INPROGRESS = 'in progress',
    WIN = 'WIN',
    LOSE = 'LOSE'
}

export enum MineShown {
    FLAG = 'flag',
    BOMB = 'bomb',
    UNVEILED = '',
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