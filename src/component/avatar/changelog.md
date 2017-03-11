## [Unreleased][Unreleased]

## [6.0.0][6.0.0] - 2017-02-27

### Added
- [Patch] Focus state for buttons. (#89)
- [Patch] Fill colors to links.

### Changed
- [Patch] Base color from `chalkboard` to `slate`. (#88)
- [Patch] Headers responding at `medium` breakpoint instead of `small`. (#87)
- [Patch] Button line-height dropped 1px for better alignment.
- [Patch] Large button padding dropped from 48px to 32px to match current website. (#91)
- [Patch] Small button padding dropped from 16px to 24px.
- [Release] Moved some properties from `html` to `body` in `main.scss`. (#93)
- [Release] Simplified breakpoint mixin accepts string or number, e.g., `'medium'` or `500px`. (#63)

## [5.0.0][5.0.0] - 2017-02-24

### Removed
- [Patch] Removed unreferenced placeholders (#72)
- [Release] Removed components to reduce complexity. Will re-add as needed. (#82)
- [Release] Removed component variables to reduce complexity. Will re-add as needed. (#82)

### Added
- [Feature] Adding `tp-text-input--large` for use with `tp-button--large` (#74)
- [Feature] Adding `tp-display--none--small/medium/large` options for use with mixins.

### Changed
- [Patch] Removing extraneous commas in `_thumbprint-variables.scss` (#77)
- [Patch] Slightly larger radio/checkbox inputs to match current site.
- [Release] Grouping colors differently, combining `background` with `ui`, renaming references.

## [4.0.0][4.0.0] - 2017-02-09

### Changed
- [Patch] Updated border-radius for buttons/inputs to 4px (#57)
- [Release] New tab styles (#34)
- [Release] Renaming breakpoint mixin from `larger-than` to `respond-above` (#34)
- [Release] Rebuilding calendar to support multiple months (#66)
- [Patch] Adding `button--narrow` doc example, update code (#67)
- [Patch] Updating path for font urls to thumbprint.thumbtack.com (#69)

## [3.0.2][3.0.2] - 2017-02-07

### Added
- [Patch] Focus state for `tp-select` (#48)
- [Patch] `user-select: none` added to `.tp-input-row .tp-label` to prevent accidental text selection (#49)
- [Patch] Moving `link.scss` higher in the order since it affects root element, buttons (#53)
- [Patch] Removed `:visited` values from links, buttons, not needed (#53)
- [Patch] Added `:active` state to button to prevent small visual bug (#53)
- [Patch] Fixed `tp-link--danger` to show danger color for link (#53)
- [Patch] Removing duped input placeholder styling (#55)

## [3.0.1][3.0.1] - 2017-02-06

### Added
- [Patch] Adding icon examples for docs, removing placeholder icons (#42)
- [Patch] Removing unused `%tp-button-row` placeholder (#44)
- [Patch] Adding fill color for SVGs to color helpers (#46)

## [3.0.0][3.0.0] - 2017-02-02

### Added
- [Release] Changing `.tp-input-icon` class names to provide left/right icon positioning and credit card input (#27)
- [Patch] Changing line-height in inputs for better baseline support, esp. with Safari (#38)
- [Patch] Adding wide variation for `.tp-button-row` (#40)

## [2.0.0][2.0.0] - 2017-27-01

### Added
- [Release] Updated breakpoints, aligning with `grid-snap` (#27).
- [Release] Remove 'array' component (#29)
- [Patch] New `grid-snap` component (#27)

### Changed
- [Patch] Placeholder and disabled color (#32)
- [Patch] Update "input with icon" code (#33)
- [Patch] Select arrow base64 made thinner (#31)
- [Patch] Textarea default height larger, added second option (#30)

## [1.0.2][1.0.2] - 2017-04-01

### Added
- [Patch] Added proper close button (#25).

## [1.0.1][1.0.1] - 2017-04-01

### Added
- [Patch] Fixing issue with publish.

## [1.0.0][1.0.0] - 2017-04-01

### Added
- [Release] New grid system
- [Release] Renaming `utilties` directory to `utility`
- [Patch] Adding new paths for fonts.
- [Patch] Added variables for `avatar.scss`

### Removed
- [Release] Unused `tint` mixin

## [0.0.4][0.0.4] - 2016-16-08

### Added
- [Patch] Further testing.

## [0.0.3][0.0.3] - 2016-16-08

### Added
- [Patch] Adding index.js to export path.

## [0.0.2][0.0.2] - 2016-11-08

### Added
- [Patch] First publish.

[Unreleased]: https://github.com/thumbtack/thumbprint-core/compare/v6.0.0...HEAD
[0.0.2]: https://github.com/thumbtack/thumbprint-core/compare/v0.0.1...v0.0.2
[0.0.3]: https://github.com/thumbtack/thumbprint-core/compare/v0.0.2...v0.0.3
[0.0.3]: https://github.com/thumbtack/thumbprint-core/compare/v0.0.3...v0.0.4
[1.0.0]: https://github.com/thumbtack/thumbprint-core/compare/v0.0.4...v1.0.0
[1.0.1]: https://github.com/thumbtack/thumbprint-core/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/thumbtack/thumbprint-core/compare/v1.0.1...v1.0.2
[2.0.0]: https://github.com/thumbtack/thumbprint-core/compare/v1.0.2...v2.0.0
[3.0.0]: https://github.com/thumbtack/thumbprint-core/compare/v2.0.0...v3.0.0
[3.0.0]: https://github.com/thumbtack/thumbprint-core/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/thumbtack/thumbprint-core/compare/v3.0.1...v3.0.2
[3.0.0]: https://github.com/thumbtack/thumbprint-core/compare/v3.0.2...v4.0.0
[3.0.0]: https://github.com/thumbtack/thumbprint-core/compare/v4.0.0...v5.0.0
[3.0.0]: https://github.com/thumbtack/thumbprint-core/compare/v5.0.0...v6.0.0
