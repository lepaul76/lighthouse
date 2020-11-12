# Lighthouse Scores

## How is the Performance score calculated?

➡️ Please read [Lighthouse Performance Scoring at web.dev](https://web.dev/performance-scoring/).

## How is the PWA (Progressive Web App) score calculated?

The PWA category doesn't get a 0-100 score, but instead is evaluated in 3 separate groups (Fast and reliable, Installable, and PWA Optimized). In order to satisfy each grouping (and get the associated badge), every audit within the group must be passing.

![Lighthouse PWA badge - states](https://user-images.githubusercontent.com/39191/80662283-c292d280-8a45-11ea-84e8-7f8248657acf.png)

Note on https redirects: some metrics in this category have issues with https redirects because of TLS-handshake errors. More specifically you will run into this when using the ```simplehttp2server``` npm package. Subsequent metrics will fail after the https redirects (see [#1217](https://github.com/GoogleChrome/lighthouse/issues/1217), [#5910](https://github.com/GoogleChrome/lighthouse/issues/5910)).

## How is the Best Practices score calculated?

All audits in the Best Practices category are equally weighted. Therefore, implementing each audit correctly will increase your overall score by ~6 points.

## How is the SEO score calculated?

All audits in the SEO category are [equally weighted](https://github.com/GoogleChrome/lighthouse/blob/080c6b4b9fec6dfcaf8e0cd8d09c3224465e4fd3/lighthouse-core/config/default-config.js#L531-L547), with the exception ofStructured Data, which is an unscored manual audit. Therefore, implementing each audit correctly will increase your overall score by ~8 points.


## How is the accessibility score calculated?

<!-- node lighthouse-core/scripts/print-a11y-scoring.js -->

<!-- TODO: need a commit first to update url ... -->
The accessibility score is a weighted average. The specific weights, at the time of publishing, are [as follows](https://github.com/GoogleChrome/lighthouse/blob/080c6b4b9fec6dfcaf8e0cd8d09c3224465e4fd3/lighthouse-core/config/default-config.js#L450-L491):

| audit id | weight |
|-|-|
 | aria-allowed-attr | 4.4% |
 | aria-hidden-body | 4.4% |
 | aria-required-attr | 4.4% |
 | aria-required-children | 4.4% |
 | aria-required-parent | 4.4% |
 | aria-roles | 4.4% |
 | aria-valid-attr-value | 4.4% |
 | aria-valid-attr | 4.4% |
 | button-name | 4.4% |
 | duplicate-id-aria | 4.4% |
 | image-alt | 4.4% |
 | input-image-alt | 4.4% |
 | label | 4.4% |
 | meta-refresh | 4.4% |
 | meta-viewport | 4.4% |
 | video-caption | 4.4% |
 | accesskeys | 1.3% |
 | aria-hidden-focus | 1.3% |
 | aria-input-field-name | 1.3% |
 | aria-toggle-field-name | 1.3% |
 | bypass | 1.3% |
 | color-contrast | 1.3% |
 | definition-list | 1.3% |
 | dlitem | 1.3% |
 | document-title | 1.3% |
 | duplicate-id-active | 1.3% |
 | frame-title | 1.3% |
 | html-has-lang | 1.3% |
 | html-lang-valid | 1.3% |
 | link-name | 1.3% |
 | list | 1.3% |
 | listitem | 1.3% |
 | object-alt | 1.3% |
 | tabindex | 1.3% |
 | td-headers-attr | 1.3% |
 | th-has-data-cells | 1.3% |
 | valid-lang | 1.3% |
 | form-field-multiple-labels | 0.9% |
 | heading-order | 0.9% |

Each audit is a pass/fail, meaning there is no room for partial points for getting an audit half-right. For example, that means if half your buttons have screenreader friendly names, and half do not, you don't get "half" of the weighted average - you get a 0 because it needs to be implemented correctly *throughout* the page.
