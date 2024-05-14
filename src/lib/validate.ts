export class StringValidator<Options extends StringValidator.Options> {
  minlength: Options["minlength"];
  maxlength: Options["maxlength"];
  pattern: Options["pattern"];

  constructor(options: Options) {
    this.minlength = options.minlength;
    this.maxlength = options.maxlength;
    this.pattern = options.pattern;
  }

  validate(input: string) {
    if (this.minlength && input.length < this.minlength) return false;
    if (this.maxlength && input.length > this.maxlength) return false;
    if (this.pattern && !this.pattern.test(input)) return false;
    return true;
  }

  toJSON() {
    return {
      minlength: this.minlength,
      maxlength: this.maxlength,
      pattern: this.pattern?.source,
    };
  }
}

export namespace StringValidator {
  export interface Options {
    minlength?: number;
    maxlength?: number;
    pattern?: RegExp;
  }
}

const userNameOptions = {
  minlength: 3,
  maxlength: 30,
  pattern: /^[a-z0-9-]+$/,
};
export const userNameValidator = new StringValidator<typeof userNameOptions>(
  userNameOptions
);

const passwordOptions = {
  minlength: 6,
  maxlength: 255,
};
export const passwordValidator = new StringValidator<typeof passwordOptions>(
  passwordOptions
);
