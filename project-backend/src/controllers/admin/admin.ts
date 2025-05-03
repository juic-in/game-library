import { clearGames } from "../../data/db/dbGame";
import { clearUsers, getAllUsers } from "../../data/db/dbUser";

export async function clearAll() {
  await clearGames();
  await clearUsers();
  return {}
}

getAllUsers