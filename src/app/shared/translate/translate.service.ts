import { Inject, Injectable, Optional } from "@angular/core";
import { SUPPORTED_LOCALES } from "./models/supported_locales";
import { IStringTable, ITranslateService } from "./models/translator";

@Injectable({ providedIn: 'root' })
export class TranslateService implements ITranslateService {

  constructor(@Optional() @Inject('locale') locale: string){
    this.stringTable = this.selectStringTable(locale);
  }

  stringTable: IStringTable

  public translate(key: string, defaultText?: string): string {
    return this.stringTable[key] ?? defaultText;
  }

  private selectStringTable(locale: string): IStringTable {
    if (locale in SUPPORTED_LOCALES) {
      return SUPPORTED_LOCALES[locale];
    }

    return SUPPORTED_LOCALES['en'];
  }
}