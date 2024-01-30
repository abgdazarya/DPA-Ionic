import { APP_INITIALIZER, Injector, Provider } from '@angular/core';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';

function appInitializer(
  injector: Injector,
  storageService: StorageService
): () => Promise<void> {
  return () => {
    return new Promise<void>(async (resolve) => {
      const logged = await storageService.getStorage(
        StorageKeyEnum.LOG_CONDITION
      );

      if (!logged) {
        storageService.clearStorage();
      }

      return resolve();
    });
  };
}

export const AppInitializer: Provider = {
  useFactory: appInitializer,
  provide: APP_INITIALIZER,
  deps: [Injector, StorageService],
  multi: true,
};
