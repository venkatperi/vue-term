declare module 'css-element-queries' {
    export type ResizeSensorCallback = (size: { width: number; height: number; }) => void;

    class ResizeSensor {
        constructor(element: Element | Element[], callback: ResizeSensorCallback);
        detach(callback?: ResizeSensorCallback): void;
        reset(): void;

        static detach(element: Element | Element[], callback?: ResizeSensorCallback): void;
        static reset(element: Element | Element[]): void;
    }

    export {
        ResizeSensor
    }
}


