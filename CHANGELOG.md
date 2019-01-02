# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.0.0"></a>
# [5.0.0](https://github.com/alexlafroscia/ember-emotion/compare/v4.0.3...v5.0.0) (2019-01-02)


### Bug Fixes

* get FastBoot compatibility working again ([ba29d12](https://github.com/alexlafroscia/ember-emotion/commit/ba29d12))


### Chores

* **deps:** upgrade to `emotion` 10 ([a746c06](https://github.com/alexlafroscia/ember-emotion/commit/a746c06))


### BREAKING CHANGES

* **deps:** While neither the public API of `emotion` nor the addon changed, the Babel plugin has slightly less options that it did before, which could break some people's usage of the Ember addon. Because of this, it makes more sense to cut a breaking change. Note that, if you're not configuing the Babel plugin yourself, this is likely an upgrade you can perform withotu changing your code at all.
