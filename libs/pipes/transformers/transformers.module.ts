import { NgModule } from '@angular/core';
import { AccordionTitleTransformerPipe } from './accordion-title/accordion-title-transformer.pipe';
import { NickNamePipe } from './nick-name/nick-name.pipe';
import { ShortenPipe } from './shorten-text/shorten.pipe';
import { YearMonthPipe } from './year-month/year-month.pipe';
import { JobFilterTransformerPipe } from './jobFilter/jobFilter-transformer.pipe';

@NgModule({
  declarations: [
    AccordionTitleTransformerPipe,
    NickNamePipe,
    YearMonthPipe,
    ShortenPipe,
    JobFilterTransformerPipe,
  ],
  exports: [
    AccordionTitleTransformerPipe,
    NickNamePipe,
    YearMonthPipe,
    ShortenPipe,
    JobFilterTransformerPipe,
  ],
  imports: [],
})
export class TransformersModule {}
