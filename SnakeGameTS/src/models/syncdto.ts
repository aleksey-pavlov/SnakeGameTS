export type SnakeSyncDto = {
    parts: { x: number, y: number }[]
}

export type FoodSyncDto = {
    x: number
    y: number
}

export type PlayerSyncDto = {
    id: number,
    snake: SnakeSyncDto,
    score: number,
    isGameOver: boolean
}

export type SyncDto = {
    players: PlayerSyncDto[],
    food: FoodSyncDto
}