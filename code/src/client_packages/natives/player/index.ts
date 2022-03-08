import {NATIVES} from './consts';

/**
 * Get the Player's Team ID
 */
export function GetPlayerTeam(): number {
    return mp.game.invoke(NATIVES.GetPlayerTeam);
}

/**
 * Set the Player's Team ID
 *
 * @param player The Player's object.
 * @param team The ID of the team we wish to set them to.
 */
export function SetPlayerTeam(player: PlayerMp, team: number): void {
    mp.game.invoke(NATIVES.SetPlayerTeam, team);
}
