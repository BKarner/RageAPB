/**
 * Call any GTA: V native and return what it returns.
 *
 * @param hash The function has we want to call.
 * @param args The arguments to apply to the native.
 */
export function invoke(hash: string, args: Array<any>) {
    // Spread our arguments into it automatically.
    return mp.game.invoke(hash, ...args);
}

/**
 * Warn the client that the native has a specific caveat or shouldn't be used.
 *
 * @param native The native name we're calling.
 * @param reason The reason for the warning.
 */
export function warn(native: string, reason: string) {
    return console.warn(`[NATIVES] Called: ${native} | ${reason}`);
}
