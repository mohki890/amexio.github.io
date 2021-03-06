import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AmexioBaseContextMenuModule } from './base/base.contextmenu.component.module';
import {AmexioDataModule} from './data/amexio.data.module';
import {AmexioFormsModule} from './forms/amexio.forms.module';
import {AmexioLayoutModule} from './layout/amexio.layout.module';
import {AmexioMediaModule} from './media/amexio.media.module';
import {AmexioNavModule} from './navigation/amexio.nav.module';
import {AmexioPaneModule} from './panes/amexio.pane.module';
import {CommonDataService} from './services/data/common.data.service';
import {DeviceQueryService} from './services/device/device.query.service';
import {IconLoaderService} from './services/icon/icon.service';

import { AmexioTabPillComponent } from '../index';

export * from './services/data/common.data.service';
export * from './services/device/device.query.service';
export * from './services/icon/icon.service';
export * from './services/icon/icon.mapping.config';
export * from '../models/creditcardmodel.component';
export * from '../models/GridConfig';
export * from '../models/GridConstants';

@NgModule({
  imports: [
    CommonModule,
    AmexioFormsModule,
    AmexioNavModule,
    AmexioDataModule,
    AmexioLayoutModule,
    AmexioMediaModule,
    AmexioPaneModule,
    HttpClientModule,
    AmexioBaseContextMenuModule,
  ],
  entryComponents: [AmexioTabPillComponent],
  exports: [
    AmexioFormsModule,
    AmexioNavModule,
    AmexioDataModule,
    AmexioLayoutModule,
    AmexioMediaModule,
    AmexioPaneModule,
    AmexioBaseContextMenuModule,
  ],
  declarations: [],
  providers: [CommonDataService, DeviceQueryService, IconLoaderService],
})
export class AmexioWidgetModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AmexioWidgetModule,
      providers: [CommonDataService, DeviceQueryService, IconLoaderService],
    };
  }
}
