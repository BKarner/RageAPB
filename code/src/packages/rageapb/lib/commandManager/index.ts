type CommandCallback = (player: PlayerMp, fullText: string, ...args: string[]) => void;
type Command = {
    name: string,
    tags: Array<string>,
    aliases?: Array<string>
}

export const COMMANDS: Array<Command> = [];

export function addCommand(name: string, tags: Array<string>, callback: CommandCallback, aliases?: Array<string>) {
    // Add our command to the global commands object.
    COMMANDS.push({name, tags, aliases});

    // Set up the bind for the command.
    mp.events.addCommand(name, callback);
}
