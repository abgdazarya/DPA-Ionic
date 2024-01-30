import { ArrowIconsModule } from './arrows/module';
import { CalendarIconsModule } from './calendars/module';
import { ChatIconsModule } from './chats/module';
import { ControllerIconsModule } from './controllers/module';
import { DeviceIconsModule } from './devices/module';
import { DocumentIconsModule } from './documents/module';
import { EditIconsModule } from './edits/module';
import { GraphIconsModule } from './graphs/module';
import { InterfaceIconsModule } from './interfaces/module';
import { ItemIconsModule } from './items/module';
import { MediaIconsModule } from './medias/module';
import { UserIconsModule } from './users/module';
import { WarningIconsModule } from './warnings/module';

export const IconsModule: any = {
  ...ArrowIconsModule,
  ...CalendarIconsModule,
  ...ChatIconsModule,
  ...ControllerIconsModule,
  ...DeviceIconsModule,
  ...DocumentIconsModule,
  ...EditIconsModule,
  ...GraphIconsModule,
  ...InterfaceIconsModule,
  ...ItemIconsModule,
  ...MediaIconsModule,
  ...UserIconsModule,
  ...WarningIconsModule,
};
