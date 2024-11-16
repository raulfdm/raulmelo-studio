export const acceptedLanguagesCode = ['en', 'pt'] as const;
export type AcceptedLanguagesCode = (typeof acceptedLanguagesCode)[number];

export class Language {
  code: AcceptedLanguagesCode;
  name: string;

  constructor(languageCode: AcceptedLanguagesCode, name: string) {
    this.code = languageCode;
    this.name = name;
  }
}

class Languages {
  #en: Language;
  #pt: Language;

  constructor() {
    this.#en = new Language('en', 'English');
    this.#pt = new Language('pt', 'Portuguese');
  }

  public get allLanguages() {
    return [this.#en, this.#pt];
  }

  public get allLanguagesCodes(): AcceptedLanguagesCode[] {
    return this.allLanguages.map((lang) => lang.code);
  }

  public getLanguageByCode(code: AcceptedLanguagesCode) {
    return this.allLanguages.find((lang) => lang.code === code);
  }
}

export const LANGUAGES = new Languages();
