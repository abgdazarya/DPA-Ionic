import { Model } from '@shared';

export class AksesMenuItemModel extends Model<AksesMenuItemModel> {
  statusPeserta: string | undefined | null;
  aksesMenu: string | undefined | null;
}

export class AksesMenuModel extends Model<AksesMenuModel> {
  statusPeserta: string | undefined | null;
  aksesMenu: AksesMenuItemModel[] | undefined | null;
}
