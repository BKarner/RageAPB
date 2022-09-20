/**
 * Display a crude error to the client.
 * @param message The message to display.
 */
export function error(message: string) {
    mp.gui.chat.push(`[ERROR]: ${message}`);
}

/**
 * Display a crude log to the client.
 * @param message The message to display.
 */
export function log(message: string) {
    mp.gui.chat.push(message);
}
