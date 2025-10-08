import { ILifeCycle } from '@midwayjs/core';
import * as egg from '@midwayjs/web';
export declare class MainConfiguration implements ILifeCycle {
    app: egg.Application;
    onReady(): Promise<void>;
}
