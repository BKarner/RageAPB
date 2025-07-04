import Player from '../player';
import {TEAMS} from './consts';

/**
 * Handles the teams.
 */
class Team {
    public static pool: Array<Team> = [];
    public readonly members: Array<Player> = [];

    private readonly _id: number;

    constructor(teamID: number) {
        this._id = teamID;

        // Do nothing and let garbage collection pick it up.
        if (Team.pool[teamID]) {
            return;
        }

        // Add our team to the pool.
        Team.pool[teamID] = this;
    }

    /**
     * Add the given player to the team.
     *
     * @param player The player we want to add.
     */
    add(player: Player) {
        this.members.push(player);
    }

    /**
     * Remove the given player from the team.
     *
     * @param player The player we want to remove.
     */
    remove(player: Player) {
        this.members.slice(this.members.indexOf(player), 1);
    }

    /**
     * Clear the team of members.
     */
    clear(): void {
        // We never want to clear team passive.
        if (this._id === TEAMS.PASSIVE){
            return;
        }

        this.members.forEach((member: Player) => {
            // Set the player to the default team.
            member.team = TEAMS.PASSIVE;
        })
    }
}

mp.events.addCommand('setteam', (player: PlayerMp, team: string) => {
    const p = <Player>Player.Search(player);

    if (p) {
        p.team = Number(team);
    }
});

export default Team;
