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
