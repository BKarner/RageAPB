import './events';

/**
 * Handles the Player class as appropriate.
 */
class Player {
    public static pool: Array<Player> = [];
    public static local: Player|null = null;

    public readonly isClient: boolean = false;
    public readonly ragePlayer: PlayerMp|null = null;

    constructor(ragePlayer: PlayerMp, client: boolean) {
        // Firstly, determine whether or not we're the client.
        this.isClient = client;

        // Assign our rage handle so that we can call any rage player stuff.
        this.ragePlayer = ragePlayer;

        // Add this to our current player pool.
        Player.pool.push(this);

        // If we're the local player, add it to the static so we can easily reference the current player.
        if (this.isClient) {
            Player.local = this;
        }
    }

    testMethod() : void {
        mp.gui.chat.push('THIS IS A TEST METHOD');
    }
}

export default Player;

// DEBUG: DELETE.
mp.events.add('playerCommand', (cmd: string) => {
    const args = cmd.split(/[ ]+/);
    const commandName = args[0];

    args.shift();

    if (commandName === "test") {
        Player.local?.testMethod();
    }
})
