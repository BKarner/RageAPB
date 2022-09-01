import { useEffect } from 'react';
import rpc from 'rage-rpc';

/**
 * Register a timer that runs a callback as long as the component's rendered.
 */
export function useInterval(callback: () => void, time: number, initialRun: boolean, deps: any[]) {
    useEffect(() => {
        const timer = setInterval(callback, time);

        if (initialRun) callback();

        return () => {
            clearInterval(timer);
        };
    }, deps);
}

/**
 * Register an RPC handler for the lifetime of the component.
 * @param procedure - The name of the procedure
 * @param callback - The callback to handle the procedure
 * @param deps - Hook dependencies. When changed, the hook will be reregistered
 */
export function useRPCHandler(procedure: string, callback: rpc.ProcedureListener, deps: any[]) {
    useEffect(() => {
        rpc.register(procedure, callback);

        return () => {
            rpc.unregister(procedure);
        };
    }, deps);
}

/**
 * Register an event handler for the lifetime of the component.
 * @param event - The name of the event
 * @param callback - The callback to handle the event
 * @param deps - Hook dependencies. When changed, the hook will be reregistered
 */
export function useEventHandler(event: string, callback: rpc.ProcedureListener, deps?: any[]) {
    useEffect(() => {
        rpc.on(event, callback);

        return () => rpc.off(event, callback);
    }, deps);
}

/**
 * Binds a keydown event to the document for a specific key.
 * @param key
 * @param callback
 * @param deps
 */
export function useKeyDown(key: string, callback: (e: KeyboardEvent) => void, deps?: any[]) {
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === key) callback(e);
        };

        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, deps);
}

/**
 * Registers a document event.
 * @param event
 * @param callback
 * @param deps
 */
export function useDocumentEvent(event: string, callback: EventListener, deps?: any[]) {
    useEffect(() => {
        document.addEventListener(event, callback);

        return () => {
            document.removeEventListener(event, callback);
        };
    }, deps);
}

/**
 * Registers a window event.
 * @param event
 * @param callback
 * @param deps
 */
export function useWindowEvent(event: string, callback: EventListener, deps?: any[]) {
    useEffect(() => {
        window.addEventListener(event, callback);

        return () => {
            window.removeEventListener(event, callback);
        };
    }, deps);
}
