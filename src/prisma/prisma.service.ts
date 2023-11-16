import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super({
  //     log: [{ emit: 'stdout', level: 'query' }],
  //     errorFormat: 'colorless',
  //   });
  // }

  async onModuleInit() {
    await this.$connect();
  }
}
