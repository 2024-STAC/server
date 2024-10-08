import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Module({
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
