import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
    name: 'translate',
    standalone: true,
})
export class TranslatePipe implements PipeTransform {
    constructor(private translateService: TranslateService) {}

    transform(key: string): string {
        return this.translateService.translate(key);
    }
}