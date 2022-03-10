import './events';

import * as rpc from 'rage-rpc';

import {TEAMS} from '../team/consts';
import Team from '../team';

/**
 * Handles the Player class as appropriate.
 */
class Player {
    public static pool: Array<Player|null> = [];
    public static local: Player;

    public readonly isClient: boolean = false;
    public readonly ragePlayer: PlayerMp;

    private readonly _serverID: number;
    private _team: number;

    constructor(ragePlayer: PlayerMp, serverID: number) {
        // Assign a server ID to the player.
        this._serverID = serverID;

        // Assign our rage handle so that we can call any rage player stuff.
        this.ragePlayer = ragePlayer;

        // Assign our player to the default team.
        this._team = TEAMS.PASSIVE;

        // Add this to our current player pool.
        Player.pool[serverID] = this;

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
            newTeam = new Team(id);
        }

        // Add our team to the new team.
        this._team = id;
        newTeam.add(this);

        // Send our event to the client.
        rpc.triggerClient(this.ragePlayer, 'ServerSetTeam', [this.ragePlayer.id, this._team]);
    }

    /**
     * Get a new unique server ID.
     * @constructor
     */
    static GetNewServerID(): number {
        Player.pool.forEach((player: Player|null, index: number) => {
            if (!player) {
                return index;
            }
        });

        return 0;
    }
}

export default Player;
