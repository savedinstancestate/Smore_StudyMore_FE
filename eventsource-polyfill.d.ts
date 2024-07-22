declare module 'eventsource-polyfill' {
    export class EventSourcePolyfill {
        constructor(url: string, configuration: any);
        onmessage: (event: MessageEvent) => void;
        onerror: (event: Event) => void;
        close(): void;
    }
}