import './events';

import Team from '../team';
import Group, {PlayerGroupInvite} from '../group';

import * as rpc from 'rage-rpc';

import {TEAMS} from '../team/consts';

/**
 * Handles the Player class as appropriate.
 */
class Player {
    public static pool: Array<Player|null> = [];
    public static local: Player;

    public readonly isClient: boolean = false;
    public readonly ragePlayer: PlayerMp;
    public readonly serverID: number;

    public group?: Group;
    public groupInvites: Array<PlayerGroupInvite> = [];

    private _team: number;

    constructor(ragePlayer: PlayerMp, serverID: number) {
        // Assign a server ID to the player.
        this.serverID = serverID;

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
     * Get the player's name.
     */
    get name(): string {
        return this.ragePlayer.name;
    }

    /**
     * Set the new name.
     *
     * @param newName The new name to be.
     */
    set name(newName: string) {
        this.ragePlayer.name = newName;
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

        return Player.pool.length;
    }

    /**
     * Search for a Player or Players given any identifier.
     *
     * @example const [playerA, playerB] = <Array<Player>> Player.Search([playerAName, playerBID]);
     *  - Will return playerA and playerB as new variables. Either a Player object, undefined or null.
     * @example const player = <Player> Player.Search(playerName);
     *  - Will return player as a new variable. Either a Player object, undefined or null.
     *
     * @param searchParams Either an array of parameters or a single parameter.
     * @returns player(s) Multiple Players or a single Player depending on whether searchParams is an array or not.
     */
    static Search(searchParams: PlayerMp|number|string|Array<PlayerMp|number|string>):  Player | null | undefined | Array<Player | null | undefined> | undefined {
        if (Array.isArray(searchParams)) {
            const players: Array<Player|null|undefined> = [];
            for (const param of searchParams) {
                if (typeof param === 'string') {
                    if (!isNaN(Number(param))) {
                        players.push(Player.pool.find((p) => p?.serverID === Number(param)));
                    } else {
                        players.push(Player.pool.find((p) => p?.name === param));
                    }
                } else if (<PlayerMp>param) {
                    players.push(Player.pool.find((p) => p?.ragePlayer === param));
                }
            }

            return players;
        } else {
            if (typeof searchParams === 'string') {
                if (!isNaN(Number(searchParams))) {
                    return Player.pool.find((p) => p?.serverID === Number(searchParams));
                }

                return Player.pool.find((p) => p?.name === searchParams);
            } else if (<PlayerMp>searchParams) {
                return Player.pool.find((p) => p?.ragePlayer === searchParams);
            }
        }

        return undefined;
    }
}

export default Player;
