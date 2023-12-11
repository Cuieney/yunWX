import { App, Configuration, ILifeCycle } from '@midwayjs/core';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as orm from '@midwayjs/typeorm';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
  imports: [egg, orm],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration implements ILifeCycle {
  @App('egg')
  app: egg.Application;

  async onReady() {
    this.app.useMiddleware([ReportMiddleware]);
  }
}
