import Mixin from '@ember/object/mixin';

export default function createMixin(styles) {
  return Mixin.create({
    classNames: [styles.default],

    init() {
      this._super();

      for (const key of Object.keys(styles)) {
        if (key !== 'default') {
          this.set(key, styles[key]);
        }
      }
    }
  });
}
