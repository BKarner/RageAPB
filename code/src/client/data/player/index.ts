import './events';
import './nametags';
import './rpc';

import Team from '../team';

import {TEAMS} from '../team/consts';
import {SetPlayerTeam} from '../../@natives/player';

/**
 * Handles the Player class as appropriate.
 */
class Player {
    public static pool: Array<Player> = [];
    public static local: Player;

    public readonly isClient: boolean = false;
    public readonly ragePlayer: PlayerMp;
    private _team: number;

    constructor(ragePlayer: PlayerMp, client: boolean) {
        // Firstly, determine whether or not we're the client.
        this.isClient = client;

        // Assign our rage handle so that we can call any rage player stuff.
        this.ragePlayer = ragePlayer;

        // TODO: Assign player ID from the player pool on the server.

        // Assign our player to the default team.
        this._team = TEAMS.PASSIVE;

        // Add this to our current player pool.
        Player.pool.push(this);

        // If we're the local player, add it to the static so we can easily reference the current player.
        if (this.isClient) {
            Player.local = this;
        }
    }

    /**
     * Get the player's current team.
     */
    get team(): number {
        return this._team;
    }

    /**
     * Set the player's team.
     * @param id
     */
    set team(id: number) {
        const currentTeam = Team.pool[this._team];

        // Remove our player from the team.
        if (currentTeam && id !== this._team) {
            currentTeam.remove(this);
        }

        // Create our team if it doesn't exist.
        let newTeam = Team.pool[id];
        if (!newTeam) {
            newTeam = new Team(id, this);
        }

        // Add our team to the new team.
        this._team = id;
        SetPlayerTeam(this.ragePlayer, id);
        newTeam.add(this);
    }
}

export default Player;
