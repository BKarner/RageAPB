import {NATIVES} from './consts';
import {invoke, warn} from '../index';

/**
 * Get the number of player's currently in the team.
 *
 * @link https://natives.altv.mp/#/0x1FC200409F10E6F1
 * @param team The id of the team we wish to check.
 */
export function GetNumberOfPlayersInTeam(team: number): number {
    return invoke(NATIVES.GetNumberOfPlayersInTeam, [team]);
}

/**
 * Get the Player's Team ID
 *
 * @link https://natives.altv.mp/#/0x37039302F4E0A008
 * @param player The Player's object.
 */
export function GetPlayerTeam(player: PlayerMp): number {
    return invoke(NATIVES.GetPlayerTeam, [player]);
}

/**
 * Get whether or not the player is climbing.
 *
 * @warning Exists via PlayerMp::isClimbing
 * @link https://natives.altv.mp/#/0x95E8F73DC65EFB9C
 * @param player The Player's object.
 */
export function IsPlayerClimbing(player: PlayerMp): boolean {
    warn('IsPlayerClimbing', 'Exists via PlayerMp::isClimbing');
    return invoke(NATIVES.IsPlayerClimbing, [player]);
}

/**
 * Set the Player's Team ID
 *
 * @link https://natives.altv.mp/#/0x0299FA38396A4940
 * @param player The Player's object.
 * @param team The ID of the team we wish to set them to.
 */
export function SetPlayerTeam(player: PlayerMp, team: number): void {
    return invoke(NATIVES.SetPlayerTeam, [player, team]);
}
