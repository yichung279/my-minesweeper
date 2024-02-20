/* eslint no-unused-vars: 0 */
// TODO: fix unused-vars
export enum MineShown {
    FLAG,
    BOMB,
    UNVEILED = '',
}

export interface Mine {
    mine: Boolean
    pos_i: Number
    pos_j: Number
    visited: Boolean
    flaged: Boolean
    boom: Boolean
    show: MineShown
}