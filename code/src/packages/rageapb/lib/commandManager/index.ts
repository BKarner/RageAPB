type CommandCallback = (player: PlayerMp, fullText: string, ...args: string[]) => void;
type Command = {
    name: string,
    tags: Array<string>,
    aliases?: Array<string>
}

export const COMMANDS: Array<Command> = [];

/**
 * Add a command to our command registry.
 *
 * @example - addCommand('aweapon', ['admin', 'spawner'], ()=>{}, ['aspawnweapon']);
 *  This would assign a new command called "aweapon" or "aspawnweapon" with the tags admin and spawner.
 *
 * @param name The name of the command we want to add.
 * @param tags Any tags to assign.
 * @param callback
 * @param aliases
 */
export function addCommand(name: string, tags: Array<string>, callback: CommandCallback, aliases?: Array<string>) {
    // Add our command to the global commands object.
    COMMANDS.push({name, tags, aliases});

    // Set up the bind for the command.
    mp.events.addCommand(name, callback);
}
