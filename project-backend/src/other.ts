import GameModel from './data/models/GameModel';

export async function clear() {
  await GameModel.deleteMany({});
}
