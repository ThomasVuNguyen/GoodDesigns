;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="335946e6-ae14-abe4-a90b-5d32b18ebe4a")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,[315117,t=>{var e=t.i(843476),n=t.i(3303),o=t.i(271645);let r=`
:host(.dg-consent-banner) {
  --dg-primary-font: var(--font-public-sans), ui-sans-serif, system-ui, sans-serif;
  --dg-secondary-font: var(--font-public-sans), ui-sans-serif, system-ui, sans-serif;
  --dg-consent-background-color: rgb(var(--surface-200));
  --dg-consent-background-border: 1px solid var(--stroke-light);
  --consent-border-radius: 4px;
  --dg-title-font-size: 13px;
  --dg-title-font-weight: 600;
  --dg-title-font-color: var(--content-strong);
  --dg-title-line-height: 17px;
  --dg-heading-font-size: 12px;
  --dg-heading-font-weight: 600;
  --dg-heading-font-color: var(--content-strong);
  --dg-heading-line-height: 16px;
  --dg-body-font-size: 10px;
  --dg-body-font-weight: 400;
  --dg-body-font-color: var(--content-light);
  --dg-body-line-height: 15px;
  --dg-policy-option-heading-size: 11px;
  --dg-policy-option-heading-weight: 600;
  --dg-policy-option-heading-color: var(--content-strong);
  --dg-policy-option-heading-enabled-color: var(--content-strong);
  --dg-policy-option-description-font-size: 10px;
  --dg-policy-option-description-font-weight: 400;
  --dg-policy-option-description-font-color: var(--content-light);
  --dg-policy-option-essential-label-font-size: 10px;
  --dg-policy-option-essential-label-font-weight: 500;
  --dg-policy-option-essential-label-font-color: var(--content-lighter);
  --dg-slider-primary: rgb(var(--surface-300));
  --dg-slider-secondary: var(--stroke-strongest);
  --dg-slider-enabled-primary: rgb(var(--surface-300));
  --dg-slider-enabled-secondary: var(--content-strong);
  --dg-button-font-size: 12px;
  --dg-button-font-weight: 600;
  --dg-button-color: var(--content-strong);
  --dg-button-background: rgb(var(--surface-300));
  --dg-button-border: 1px solid var(--stroke-strong);
  --dg-button-radius: 4px;
  box-shadow: none !important;
  box-sizing: border-box !important;
  pointer-events: auto !important;
  position: fixed !important;
  text-align: left !important;
  z-index: 2147483646 !important;
}

:host(.dg-consent-banner.dg-left),
:host(.dg-consent-banner.dg-right),
:host(.dg-consent-banner.dg-bottom) {
  background: transparent !important;
  bottom: 16px !important;
  height: auto !important;
  left: 16px !important;
  max-height: calc(100vh - 32px) !important;
  max-width: min(280px, calc(100vw - 32px)) !important;
  right: auto !important;
  top: auto !important;
  width: min(280px, calc(100vw - 32px)) !important;
}

:host(.dg-consent-banner.dg-modal),
:host(.dg-consent-banner:not(.dg-left):not(.dg-right):not(.dg-bottom)) {
  align-items: center !important;
  background: rgb(0 0 0 / 0.48) !important;
  bottom: auto !important;
  height: 100vh !important;
  justify-content: center !important;
  left: 0 !important;
  max-height: none !important;
  max-width: none !important;
  padding: 16px !important;
  right: auto !important;
  top: 0 !important;
  width: 100vw !important;
}

:host(.dg-consent-banner.dg-modal) .dg-app,
:host(.dg-consent-banner:not(.dg-left):not(.dg-right):not(.dg-bottom)) .dg-app {
  left: 50% !important;
  max-height: min(720px, calc(100vh - 32px)) !important;
  max-width: min(520px, calc(100vw - 32px)) !important;
  padding: 16px !important;
  position: fixed !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: min(520px, calc(100vw - 32px)) !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) {
  bottom: 16px !important;
  box-sizing: border-box !important;
  display: grid !important;
  column-gap: 8px !important;
  row-gap: 0 !important;
  grid-template-columns: auto 1fr auto auto !important;
  grid-template-rows: auto auto auto minmax(0, 1fr) auto !important;
  height: min(500px, calc(100vh - 64px)) !important;
  left: auto !important;
  max-height: calc(100vh - 64px) !important;
  max-width: min(680px, calc(100vw - 32px)) !important;
  overflow: hidden !important;
  padding: 16px !important;
  position: fixed !important;
  right: 16px !important;
  top: auto !important;
  width: min(680px, calc(100vw - 32px)) !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-header,
:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-main-content-explanation,
:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-links,
:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-main-content-policies {
  grid-column: 1 / -1 !important;
  min-width: 0 !important;
}

:host(.dg-consent-banner) .dg-app {
  background: rgb(var(--surface-200)) !important;
  border: 1px solid var(--stroke-light) !important;
  border-radius: 4px !important;
  box-shadow:
    0 10px 10px -5px rgb(0 0 0 / 0.04),
    0 20px 25px -5px rgb(0 0 0 / 0.1) !important;
  box-sizing: border-box !important;
  color: var(--content-light) !important;
  display: flex !important;
  flex-direction: column !important;
  font-family: var(--font-public-sans), ui-sans-serif, system-ui, sans-serif !important;
  gap: 0 !important;
  max-height: calc(100vh - 32px) !important;
  overflow: auto !important;
  padding: 12px !important;
  pointer-events: auto !important;
  position: relative !important;
  width: min(280px, calc(100vw - 32px)) !important;
}

:host(.dg-consent-banner:has(.dg-main-content-policies)) {
  align-items: center !important;
  background: rgb(0 0 0 / 0.48) !important;
  bottom: auto !important;
  height: 100vh !important;
  justify-content: center !important;
  left: 0 !important;
  max-height: none !important;
  max-width: none !important;
  padding: 16px !important;
  right: auto !important;
  top: 0 !important;
  width: 100vw !important;
}

:host(.dg-consent-banner:has(.dg-main-content-policies)) .dg-app:has(.dg-main-content-policies) {
  bottom: auto !important;
  height: min(600px, calc(100vh - 32px)) !important;
  left: 50% !important;
  max-height: calc(100vh - 32px) !important;
  max-width: min(680px, calc(100vw - 32px)) !important;
  position: fixed !important;
  right: auto !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: min(680px, calc(100vw - 32px)) !important;
}

:host(.dg-consent-banner) .dg-header {
  align-items: flex-start !important;
  display: flex !important;
  gap: 8px !important;
  justify-content: space-between !important;
  margin: 0 !important;
  padding: 0 !important;
}

:host(.dg-consent-banner) .dg-header .dg-main-content-explanation {
  margin: 0 !important;
  max-width: 220px !important;
}

:host(.dg-consent-banner.dg-modal) .dg-header .dg-main-content-explanation {
  max-width: calc(100% - 36px) !important;
}

:host(.dg-consent-banner) .dg-header-close {
  align-items: center !important;
  background: transparent !important;
  border: 1px solid transparent !important;
  border-radius: 4px !important;
  color: var(--content-lighter) !important;
  display: inline-flex !important;
  height: 24px !important;
  justify-content: center !important;
  margin: -5px -5px 0 auto !important;
  padding: 0 !important;
  width: 24px !important;
}

:host(.dg-consent-banner) .dg-header-close svg {
  height: 16px !important;
  width: 16px !important;
}

:host(.dg-consent-banner) .dg-header-close path,
:host(.dg-consent-banner) .language-dropdown-trigger path,
:host(.dg-consent-banner) .language-dropdown-menu path {
  fill: currentColor !important;
}

:host(.dg-consent-banner) .dg-header-close:hover {
  background: var(--surface-alpha-strong) !important;
  color: var(--content-strong) !important;
}

:host(.dg-consent-banner) .dg-main-language-dropdown {
  display: none !important;
}

:host(.dg-consent-banner) .dg-text-title {
  color: var(--content-strong) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
  line-height: 17px !important;
}

:host(.dg-consent-banner) .dg-text-body {
  color: var(--content-light) !important;
  font-size: 10px !important;
  font-weight: 400 !important;
  line-height: 15px !important;
}

:host(.dg-consent-banner) .dg-toggle-collapse-button {
  display: none !important;
}

:host(.dg-consent-banner) .dg-app.dg-collapsed > .dg-main-content-explanation.dg-text-body,
:host(.dg-consent-banner) .dg-app.dg-collapsed .dg-main-content-explanation.dg-text-body,
:host(.dg-consent-banner) .dg-app.dg-collapsed .dg-text-body {
  display: block !important;
  max-height: none !important;
  overflow: visible !important;
  visibility: visible !important;
}

:host(.dg-consent-banner) .dg-main-content-explanation {
  margin: 8px 0 0 !important;
}

:host(.dg-consent-banner.dg-modal) > .dg-app > .dg-main-content-explanation.dg-text-body {
  max-height: none !important;
  overflow: visible !important;
  padding-right: 4px !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-main-content-explanation.dg-text-body {
  max-height: none !important;
  overflow: visible !important;
  padding-right: 4px !important;
}

:host(.dg-consent-banner) .dg-main-content-explanation p {
  margin: 0 !important;
}

:host(.dg-consent-banner) .dg-main-content-explanation a,
:host(.dg-consent-banner) .dg-link,
:host(.dg-consent-banner) .dg-tracking-details-back-link-text {
  color: var(--content-strong) !important;
  font-weight: 500 !important;
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
}

:host(.dg-consent-banner) .dg-links {
  margin: 8px 0 0 !important;
}

:host(.dg-consent-banner) .dg-link {
  font-size: 11px !important;
  line-height: 16px !important;
  margin: 0 !important;
  max-width: 100% !important;
}

:host(.dg-consent-banner) .dg-button {
  align-items: center !important;
  border-radius: 4px !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
  display: inline-flex !important;
  font-family: var(--font-public-sans), ui-sans-serif, system-ui, sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  gap: 4px !important;
  height: 32px !important;
  justify-content: center !important;
  letter-spacing: -0.01em !important;
  line-height: 16px !important;
  margin: 8px 0 0 !important;
  min-height: 32px !important;
  padding: 0 12px !important;
  pointer-events: auto !important;
  transition:
    background-color 160ms cubic-bezier(.25, .46, .45, .94),
    border-color 160ms cubic-bezier(.25, .46, .45, .94),
    color 160ms cubic-bezier(.25, .46, .45, .94),
    transform 160ms cubic-bezier(.25, .46, .45, .94),
    opacity 160ms cubic-bezier(.25, .46, .45, .94) !important;
  width: 100% !important;
}

:host(.dg-consent-banner) .dg-button:active {
  transform: scale(0.98) !important;
}

:host(.dg-consent-banner) .dg-header-close,
:host(.dg-consent-banner) .clickable,
:host(.dg-consent-banner) .dg-option-info {
  pointer-events: auto !important;
}

:host(.dg-consent-banner.dg-modal) .dg-button {
  margin-top: 10px !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button {
  align-self: end !important;
  bottom: auto !important;
  grid-row: 5 !important;
  left: auto !important;
  margin-top: 12px !important;
  min-width: 0 !important;
  position: static !important;
  right: auto !important;
  top: auto !important;
  width: auto !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.custom {
  grid-column: 3 !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.accept_all {
  grid-column: 4 !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.reject_all {
  grid-column: 1 !important;
}

:host(.dg-consent-banner) .dg-button.accept_all {
  background: var(--content-strong) !important;
  border: 1px solid transparent !important;
  color: rgb(var(--surface-300)) !important;
}

:host(.dg-consent-banner) .dg-button.accept_all:hover {
  opacity: 0.86 !important;
}

:host(.dg-consent-banner) .dg-button.reject_all,
:host(.dg-consent-banner) .dg-button.accept_some {
  background: rgb(var(--surface-300)) !important;
  border: 1px solid var(--stroke-strong) !important;
  color: var(--content-strong) !important;
}

:host(.dg-consent-banner) .dg-button.reject_all:hover,
:host(.dg-consent-banner) .dg-button.accept_some:hover {
  background: rgb(var(--surface-100)) !important;
  border-color: var(--stroke-stronger) !important;
}

:host-context(.dark) .dg-button.reject_all,
:host-context(.dark) .dg-button.accept_some {
  background: rgb(var(--surface-100)) !important;
  border-color: var(--stroke-strong) !important;
  color: var(--content-strong) !important;
}

:host-context(.dark) .dg-button.reject_all:hover,
:host-context(.dark) .dg-button.accept_some:hover {
  background: rgb(var(--surface-50)) !important;
  border-color: var(--stroke-stronger) !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.reject_all {
  background: transparent !important;
  border: 1px solid transparent !important;
  color: var(--content-strong) !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.reject_all:hover {
  background: var(--surface-alpha-strong) !important;
  border-color: transparent !important;
}

:host-context(.dark) .dg-app:has(.dg-main-content-policies) > .dg-button.reject_all {
  background: transparent !important;
  border-color: transparent !important;
  color: var(--content-strong) !important;
}

:host-context(.dark) .dg-app:has(.dg-main-content-policies) > .dg-button.reject_all:hover {
  background: var(--surface-alpha-strong) !important;
  border-color: transparent !important;
}

:host(.dg-consent-banner) .dg-button.open_layer,
:host(.dg-consent-banner) .dg-button.custom {
  background: transparent !important;
  border: 1px solid transparent !important;
  color: var(--content-strong) !important;
}

:host(.dg-consent-banner) .dg-button.open_layer:hover,
:host(.dg-consent-banner) .dg-button.custom:hover {
  background: var(--surface-alpha-strong) !important;
  border-color: transparent !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.custom {
  background: rgb(var(--surface-300)) !important;
  border: 1px solid var(--stroke-strong) !important;
  color: var(--content-strong) !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.custom:hover {
  background: rgb(var(--surface-100)) !important;
  border-color: var(--stroke-stronger) !important;
}

:host-context(.dark) .dg-app:has(.dg-main-content-policies) > .dg-button.custom {
  background: rgb(var(--surface-100)) !important;
  border-color: var(--stroke-strong) !important;
}

:host-context(.dark) .dg-app:has(.dg-main-content-policies) > .dg-button.custom:hover {
  background: rgb(var(--surface-50)) !important;
  border-color: var(--stroke-stronger) !important;
}

:host(.dg-consent-banner) .dg-main-content-policies {
  margin: 10px 0 0 !important;
  padding: 0 !important;
}

:host(.dg-consent-banner.dg-modal) .dg-main-content-policies {
  display: grid !important;
  gap: 8px !important;
  margin-top: 12px !important;
  max-height: none !important;
  min-height: 0 !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  scrollbar-gutter: stable !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) .dg-main-content-policies {
  align-content: start !important;
  align-items: start !important;
  box-sizing: border-box !important;
  display: grid !important;
  gap: 8px !important;
  grid-auto-rows: max-content !important;
  margin-top: 12px !important;
  max-height: none !important;
  min-height: 0 !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  padding: 0 0 0 0 !important;
  scrollbar-gutter: stable !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option {
  background: rgb(var(--surface-200)) !important;
  border: 1px solid var(--stroke-light) !important;
  border-radius: 4px !important;
  box-sizing: border-box !important;
  flex: 0 0 auto !important;
  height: auto !important;
  margin: 0 0 6px !important;
  min-height: 0 !important;
  padding: 8px !important;
  width: 100% !important;
}

:host(.dg-consent-banner.dg-modal) .dg-main-content-policy-option {
  margin: 0 !important;
  padding: 10px !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) .dg-main-content-policy-option {
  background: rgb(var(--surface-200)) !important;
  border: 1px solid var(--stroke-base) !important;
  border-radius: 4px !important;
  align-self: start !important;
  flex: 0 0 auto !important;
  height: auto !important;
  margin: 0 !important;
  min-height: 0 !important;
  padding: 10px 12px !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible {
  display: grid !important;
  grid-template-rows: 0fr !important;
  height: auto !important;
  margin: 0 !important;
  min-height: 0 !important;
  overflow: hidden !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible.isOpen {
  grid-template-rows: 1fr !important;
  margin-top: 8px !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible:not(.isOpen) {
  display: none !important;
  grid-template-rows: 0fr !important;
  height: 0 !important;
  margin: 0 !important;
  min-height: 0 !important;
  overflow: hidden !important;
  padding: 0 !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible:not(.isOpen) > *,
:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible:not(.isOpen) .dg-main-content-policy-option-description {
  display: none !important;
  height: 0 !important;
  margin: 0 !important;
  min-height: 0 !important;
  overflow: hidden !important;
  padding: 0 !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible[aria-hidden="true"],
:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible[inert] {
  display: none !important;
  grid-template-rows: 0fr !important;
  height: 0 !important;
  margin: 0 !important;
  min-height: 0 !important;
  overflow: hidden !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible[aria-hidden="true"] > *,
:host(.dg-consent-banner) .dg-main-content-policy-option .dg-collapsible[inert] > * {
  display: none !important;
  height: 0 !important;
  min-height: 0 !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option:has(.dg-collapsible:not(.isOpen)) {
  height: fit-content !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option-heading {
  color: var(--content-strong) !important;
  display: flex !important;
  gap: 6px !important;
  height: auto !important;
  min-height: 0 !important;
  padding: 0 !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) .dg-main-content-policy-option-heading {
  align-items: center !important;
  min-height: 0 !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option-heading button {
  align-items: center !important;
  color: var(--content-strong) !important;
  display: inline-flex !important;
  font-family: var(--font-public-sans), ui-sans-serif, system-ui, sans-serif !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  gap: 6px !important;
  line-height: 16px !important;
  margin: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option-heading strong {
  color: var(--content-strong) !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option.dg-essential,
:host(.dg-consent-banner) .dg-main-content-policy-option.dg-essential .dg-main-content-policy-option-heading,
:host(.dg-consent-banner) .dg-main-content-policy-option.dg-essential .clickable,
:host(.dg-consent-banner) .dg-main-content-policy-option.dg-essential strong {
  color: var(--content-strong) !important;
  opacity: 1 !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option.dg-essential .dg-chevron {
  color: var(--content-lighter) !important;
  opacity: 1 !important;
}

:host(.dg-consent-banner) .dg-chevron {
  color: var(--content-lighter) !important;
  flex: none !important;
  height: 14px !important;
  padding-right: 0 !important;
  width: 14px !important;
}

:host(.dg-consent-banner) .dg-chevron path {
  fill: currentColor !important;
}

:host(.dg-consent-banner) .dg-main-content-policy-option-description {
  color: var(--content-light) !important;
  margin-top: 4px !important;
  padding: 0 0 0 18px !important;
}

:host(.dg-consent-banner.dg-modal) .dg-main-content-policy-option-description {
  font-size: 11px !important;
  font-weight: 500 !important;
  line-height: 16px !important;
}

:host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) .dg-main-content-policy-option-description {
  font-size: 11px !important;
  font-weight: 500 !important;
  line-height: 16px !important;
  margin-top: 8px !important;
  padding-left: 20px !important;
}

:host(.dg-consent-banner) .dg-option-info {
  min-height: 20px !important;
}

:host(.dg-consent-banner) .dg-slider.essential-label {
  color: var(--content-lighter) !important;
  font-size: 10px !important;
  font-weight: 500 !important;
  line-height: 14px !important;
  white-space: nowrap !important;
}

:host(.dg-consent-banner) input[type=checkbox]:not(:disabled) + label .dg-slider {
  background: var(--content-muted) !important;
  border-radius: 9999px !important;
  height: 24px !important;
  width: 44px !important;
}

:host(.dg-consent-banner) input[type=checkbox]:not(:disabled) + label .dg-slider::after {
  background: rgb(var(--surface-300)) !important;
  border-radius: 9999px !important;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.16) !important;
  height: 20px !important;
  left: 2px !important;
  top: 2px !important;
  width: 20px !important;
}

:host(.dg-consent-banner) input[type=checkbox]:not(:disabled):checked + label .dg-slider {
  background: var(--content-strong) !important;
}

:host(.dg-consent-banner) input[type=checkbox]:not(:disabled):checked + label .dg-slider::after {
  background: var(--content-inverse-strong) !important;
  left: 22px !important;
}

:host(.dg-consent-banner) .dg-tracking-details {
  background: rgb(var(--surface-300)) !important;
  color: var(--content-light) !important;
}

:host(.dg-consent-banner) .dg-tracking-details-search-input,
:host(.dg-consent-banner) .dg-tracking-details-category-dropdown {
  background: rgb(var(--surface-300)) !important;
  border: 1px solid var(--stroke-strong) !important;
  border-radius: 4px !important;
  color: var(--content-strong) !important;
  font-size: 12px !important;
  min-height: 32px !important;
}

@media (max-width: 640px) {
  :host(.dg-consent-banner),
  :host(.dg-consent-banner.dg-left),
  :host(.dg-consent-banner.dg-right),
  :host(.dg-consent-banner.dg-bottom) {
    bottom: 12px !important;
    left: 12px !important;
    max-width: calc(100% - 24px) !important;
    right: 12px !important;
    width: auto !important;
  }

  :host(.dg-consent-banner.dg-modal),
  :host(.dg-consent-banner:not(.dg-left):not(.dg-right):not(.dg-bottom)) {
    bottom: auto !important;
    height: 100vh !important;
    left: 0 !important;
    max-height: none !important;
    max-width: none !important;
    padding: 12px !important;
    top: 0 !important;
    width: 100vw !important;
  }

  :host(.dg-consent-banner:has(.dg-main-content-policies)) {
    align-items: center !important;
    background: rgb(0 0 0 / 0.48) !important;
    bottom: auto !important;
    height: 100% !important;
    justify-content: center !important;
    left: 0 !important;
    max-height: none !important;
    max-width: none !important;
    padding: 12px !important;
    right: auto !important;
    top: 0 !important;
    width: 100% !important;
  }

  :host(.dg-consent-banner.dg-modal) .dg-app,
  :host(.dg-consent-banner:not(.dg-left):not(.dg-right):not(.dg-bottom)) .dg-app {
    left: 12px !important;
    max-height: calc(100vh - 24px) !important;
    max-width: calc(100vw - 24px) !important;
    padding: 12px !important;
    position: fixed !important;
    top: 12px !important;
    transform: none !important;
    width: calc(100vw - 24px) !important;
  }

  :host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) {
    bottom: 12px !important;
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto auto minmax(0, 1fr) auto auto auto !important;
    height: calc(100vh - 24px) !important;
    left: 12px !important;
    max-height: calc(100vh - 24px) !important;
    max-width: none !important;
    overflow: hidden !important;
    padding: 12px !important;
    right: 12px !important;
    top: auto !important;
    transform: none !important;
    width: auto !important;
  }

  :host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.custom,
  :host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.accept_all,
  :host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.reject_all {
    grid-column: 1 !important;
    margin-left: 0 !important;
    width: 100% !important;
  }

  :host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.accept_all {
    grid-row: 5 !important;
  }

  :host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.custom {
    grid-row: 6 !important;
  }

  :host(.dg-consent-banner) .dg-app:has(.dg-main-content-policies) > .dg-button.reject_all {
    grid-row: 7 !important;
  }

  :host(.dg-consent-banner) .dg-app {
    max-width: none !important;
    padding: 12px !important;
    width: 100% !important;
  }

  :host(.dg-consent-banner) .dg-header .dg-main-content-explanation {
    max-width: calc(100% - 36px) !important;
  }

  :host(.dg-consent-banner) .dg-app.dg-collapsed:not(:has(> .dg-main-content-explanation.dg-text-body)) > .dg-header {
    column-gap: 8px !important;
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) auto !important;
  }

  :host(.dg-consent-banner) .dg-app.dg-collapsed:not(:has(> .dg-main-content-explanation.dg-text-body)) > .dg-header .dg-main-content-explanation {
    max-width: none !important;
  }

  :host(.dg-consent-banner) .dg-app.dg-collapsed:not(:has(> .dg-main-content-explanation.dg-text-body)) > .dg-header::after {
    color: var(--content-light) !important;
    content: "We and our vendors use cookies and similar technologies to enhance your experience, analyze site traffic, personalize content, and deliver targeted advertising. We need your consent to use non-essential cookies. You can choose which categories to allow below. For more details, please see our Cookie Policy.";
    display: block !important;
    font-size: 10px !important;
    font-weight: 400 !important;
    grid-column: 1 / -1 !important;
    line-height: 15px !important;
    margin-top: 8px !important;
  }

}
`,a=`
(function() {
  var styleId = 'dg-consent-custom-style';
  var css = ${JSON.stringify(r.trim())};
  var existing = document.getElementById(styleId);
  if (existing) {
    existing.textContent = css;
    return;
  }
  var style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
})();
`,i=`
(function() {
  window.DG_CONSENT_BLOCK_RELOAD = true;
  window.dgEvent = window.dgEvent || [];
  var previous;
  function snapshot() {
    try {
      var options = window.DG_BANNER_API.getConsentPreferences().cookieOptions;
      var enabledByKey = {};
      for (var i = 0; i < options.length; i++) {
        enabledByKey[options[i].gtm_key] = options[i].isEnabled === true;
      }
      return enabledByKey;
    } catch (error) {
      return undefined;
    }
  }
  window.dgEvent.push({
    event: 'initial_preference_callback',
    params: function() { previous = snapshot(); }
  });
  window.dgEvent.push({
    event: 'preference_callback',
    params: function() {
      var next = snapshot();
      if (!next) return;
      var revoked = false;
      for (var key in next) {
        // Missing baseline counts as previously-enabled: a redundant reload
        // is cheaper than leaving a revoked tracker running.
        var wasEnabled = previous ? previous[key] === true : true;
        if (wasEnabled && next[key] === false) revoked = true;
      }
      previous = next;
      // Deferred: this runs inside the same callback batch that issues
      // DataGrail's /save_preferences receipt POST (no keepalive); reloading
      // synchronously would drop the vendor-side revocation record. 1s covers
      // the single-attempt path the vendor's own post-await reload guaranteed.
      if (revoked) {
        window.setTimeout(function() { window.location.reload(); }, 1000);
      }
    }
  });
})();
`;t.s(["DataGrailConsent",0,function(){let[t,r]=(0,o.useState)(!1);return((0,o.useEffect)(()=>{r(!0)},[]),t)?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.default,{id:"datagrail-consent-custom-style",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:a.trim()}}),(0,e.jsx)(n.default,{id:"datagrail-consent-reload-policy",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:i.trim()}}),(0,e.jsx)(n.default,{id:"datagrail-consent",src:"/stub.js",strategy:"afterInteractive"})]}):null}],315117)},343562,t=>{var e=t.i(271645),n=t.i(648598);t.s(["TimezoneCapture",0,function(){let{current:t,update:o}=(0,n.N)();return(0,e.useEffect)(()=>{if(!t.timezone){let t=function(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(t){return console.warn("Failed to detect timezone",t),null}}();t&&o({timezone:t})}},[t.timezone,o]),null}])},27708,t=>{var e=t.i(843476),n=t.i(618566),o=t.i(271645),r=t.i(209663);t.s(["TrackingDocumentBoundary",0,function({children:t,initiallyExcluded:a}){let i=(0,n.usePathname)(),s=(0,r.f)(i)!==a;return(0,o.useEffect)(()=>{s&&window.location.reload()},[s]),s?null:(0,e.jsx)(e.Fragment,{children:t})}])},443880,t=>{var e=t.i(247167),n=t.i(271645);function o(){return"u">typeof window}function r(){return"production"}function a(){return"development"===((o()?window.vam:r())||"production")}t.s(["Analytics",0,function(t){return(0,n.useEffect)(()=>{var e;t.beforeSend&&(null==(e=window.va)||e.call(window,"beforeSend",t.beforeSend))},[t.beforeSend]),(0,n.useEffect)(()=>{!function(t={debug:!0}){var e;if(!o())return;!function(t="auto"){if("auto"===t){window.vam=r();return}window.vam=t}(t.mode),window.va||(window.va=function(...t){(window.vaq=window.vaq||[]).push(t)}),t.beforeSend&&(null==(e=window.va)||e.call(window,"beforeSend",t.beforeSend));let n=t.scriptSrc?t.scriptSrc:a()?"https://va.vercel-scripts.com/v1/script.debug.js":t.basePath?`${t.basePath}/insights/script.js`:"data:text/javascript,";if(document.head.querySelector(`script[src*="${n}"]`))return;let i=document.createElement("script");i.src=n,i.defer=!0,i.dataset.sdkn="@vercel/analytics"+(t.framework?`/${t.framework}`:""),i.dataset.sdkv="1.6.1",t.disableAutoTrack&&(i.dataset.disableAutoTrack="1"),t.endpoint?i.dataset.endpoint=t.endpoint:t.basePath&&(i.dataset.endpoint=`${t.basePath}/insights`),t.dsn&&(i.dataset.dsn=t.dsn),i.onerror=()=>{let t=a()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${n}. ${t}`)},a()&&!1===t.debug&&(i.dataset.debug="false"),document.head.appendChild(i)}({framework:t.framework||"react",basePath:t.basePath??function(){if(void 0!==e.default&&void 0!==e.default.env)return e.default.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH}(),...void 0!==t.route&&{disableAutoTrack:!0},...t})},[]),(0,n.useEffect)(()=>{t.route&&t.path&&function({route:t,path:e}){var n;null==(n=window.va)||n.call(window,"pageview",{route:t,path:e})}({route:t.route,path:t.path})},[t.route,t.path]),null}])},728298,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"useRouterBFCache",{enumerable:!0,get:function(){return r}});let o=t.r(271645);function r(t,e,n){let[r,a]=(0,o.useState)(()=>({tree:t,renderTree:e,stateKey:n,next:null}));if(r.tree===t)return r;let i={tree:t,renderTree:e,stateKey:n,next:null},s=1,d=r,l=i;for(;null!==d&&s<1;){if(d.stateKey===n){l.next=d.next;break}{s++;let t={tree:d.tree,renderTree:d.renderTree,stateKey:d.stateKey,next:null};l.next=t,l=t}d=d.next}return a(i),i}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},15783,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0});var o={createClientParams:function(){return a.createRenderParamsFromClient},createClientSearchParams:function(){return i.createRenderSearchParamsFromClient}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let a=t.r(797689),i=t.r(266996);("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},347257,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"ClientPageRoot",{enumerable:!0,get:function(){return l}});let o=t.r(843476),r=t.r(8372),a=t.r(271645),i=t.r(33906),s=t.r(733821),d=t.r(15783);function l({Component:t,serverProvidedParams:e}){let n,p;if(null!==e)n=e.searchParams,p=e.params;else{let t=(0,a.use)(r.LayoutRouterContext);p=null!==t?t.parentParams:{},n=(0,i.urlSearchParamsToParsedUrlQuery)((0,a.use)(s.SearchParamsContext))}let c=(0,d.createClientSearchParams)(n),u=(0,d.createClientParams)(p);return(0,o.jsx)(t,{params:u,searchParams:c})}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},92825,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"ClientSegmentRoot",{enumerable:!0,get:function(){return s}});let o=t.r(843476),r=t.r(8372),a=t.r(271645),i=t.r(15783);function s({Component:t,slots:e,serverProvidedParams:n}){let d;if(null!==n)d=n.params;else{let t=(0,a.use)(r.LayoutRouterContext);d=null!==t?t.parentParams:{}}let l=(0,i.createClientParams)(d);return(0,o.jsx)(t,{...e,params:l})}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},768017,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"HTTPAccessFallbackBoundary",{enumerable:!0,get:function(){return p}});let o=t.r(190809),r=t.r(843476),a=o._(t.r(271645)),i=t.r(590373),s=t.r(754394),d=t.r(8372);class l extends a.default.Component{constructor(t){super(t),this.state={triggeredStatus:void 0,previousPathname:t.pathname}}componentDidCatch(){}static getDerivedStateFromError(t){if((0,s.isHTTPAccessFallbackError)(t))return{triggeredStatus:(0,s.getAccessFallbackHTTPStatus)(t)};throw t}static getDerivedStateFromProps(t,e){return t.pathname!==e.previousPathname&&e.triggeredStatus?{triggeredStatus:void 0,previousPathname:t.pathname}:{triggeredStatus:e.triggeredStatus,previousPathname:t.pathname}}render(){let{notFound:t,forbidden:e,unauthorized:n,children:o}=this.props,{triggeredStatus:a}=this.state,i={[s.HTTPAccessErrorStatus.NOT_FOUND]:t,[s.HTTPAccessErrorStatus.FORBIDDEN]:e,[s.HTTPAccessErrorStatus.UNAUTHORIZED]:n};if(a){let d=a===s.HTTPAccessErrorStatus.NOT_FOUND&&t,l=a===s.HTTPAccessErrorStatus.FORBIDDEN&&e,p=a===s.HTTPAccessErrorStatus.UNAUTHORIZED&&n;return d||l||p?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("meta",{name:"robots",content:"noindex"}),!1,i[a]]}):o}return o}}function p({notFound:t,forbidden:e,unauthorized:n,children:o}){let s=(0,i.useUntrackedPathname)(),c=(0,a.useContext)(d.MissingSlotContext);return t||e||n?(0,r.jsx)(l,{pathname:s,notFound:t,forbidden:e,unauthorized:n,missingSlots:c,children:o}):(0,r.jsx)(r.Fragment,{children:o})}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},877694,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0});var o={InstantValidationBoundaryContext:function(){return a.InstantValidationBoundaryContext},PlaceValidationBoundaryBelowThisLevel:function(){return a.PlaceValidationBoundaryBelowThisLevel},RenderValidationBoundaryAtThisLevel:function(){return a.RenderValidationBoundaryAtThisLevel},SlotMarker:function(){return a.SlotMarker}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let a=t.r(722976);("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},722976,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0});var o={InstantValidationBoundaryContext:function(){return a},PlaceValidationBoundaryBelowThisLevel:function(){return i},RenderValidationBoundaryAtThisLevel:function(){return s},SlotMarker:function(){return d}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let a=null,i=null,s=null,d=null;("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},339756,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0});var o={LoadingBoundaryProvider:function(){return j},default:function(){return P}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let a=t.r(190809),i=t.r(843476),s=a._(t.r(271645)),d=t.r(8372),l=t.r(201244),p=t.r(972383),c=t.r(491915),u=t.r(358442),g=t.r(768017);t.r(877694);let m=t.r(127828),h=t.r(728298);t.r(174180);let f=t.r(733821),b=t.r(33906),x=t.r(924988);function v(t,e,n){let o=t.getClientRects();if(0===o.length)return 0;let r=1/0;for(let t=0;t<o.length;t++){let e=o[t];e.top<r&&(r=e.top)}return r>=n()&&r<=e?1:2}function y(t){let e=s.default.useRef(null);return(0,s.useLayoutEffect)(()=>{let{scrollRef:n,renderTree:o}=t,r=n.forceScroll?n.scrollRef:o.data.scrollRef;if(null===r||!r.current)return;let a=null,i=n.hashFragment;if(i){if(null===(a="top"===i?document.body:document.getElementById(i)??document.getElementsByName(i)[0]??null)){r.current=!1,n.onlyHashChange=!1,n.hashFragment=null;return}}else a=e.current;if(null===a)return;let s=!1;(0,c.disableSmoothScrollDuringRouteTransition)(()=>{let t=document.documentElement,e=null,n=null,o=null,d=()=>{var n;let r,a;return null===o&&(n=e,o=!Number.isFinite(a=Number.parseFloat(r=getComputedStyle(t).scrollPaddingTop))||a<0?0:r.endsWith("px")?a:r.endsWith("%")?a/100*n:0),o};(i||(e=t.clientHeight,0!==(n=v(a,e,d))))&&((s=!0,r.current=!1,i)?a.scrollIntoView():1!==n&&(t.scrollTop=0,2===v(a,e,d)&&a.scrollIntoView()))},{dontForceLayout:!0,onlyHashChange:n.onlyHashChange}),s&&(n.onlyHashChange=!1,n.hashFragment=null)},void 0),(0,i.jsx)(s.Fragment,{ref:e,children:t.children})}function w({children:t,renderTree:e}){let n=(0,s.useContext)(d.GlobalLayoutRouterContext);if(!n)throw Error("invariant global layout router not mounted");return(0,i.jsx)(y,{scrollRef:n.scrollRef,renderTree:e,children:t})}function _({tree:t,segmentPath:e,debugNameContext:n,renderTree:o,params:r,url:a,isActive:p}){let c,u=(0,s.useContext)(d.GlobalLayoutRouterContext);if((0,s.useContext)(f.NavigationPromisesContext),!u)throw Error("invariant global layout router not mounted");let g=null!==o.data.prefetchRsc?o.data.prefetchRsc:o.data.rsc,m=(0,s.useDeferredValue)(o.data.rsc,g);if((0,x.isDeferredRsc)(m)){let t=(0,s.use)(m);null===t&&(0,s.use)(l.unresolvedThenable),c=t}else null===m&&(0,s.use)(l.unresolvedThenable),c=m;let h=c;return(0,i.jsx)(d.LayoutRouterContext.Provider,{value:{parentTree:t,parentRenderTree:o,parentSegmentPath:e,parentParams:r,parentLoadingData:null,debugNameContext:n,url:a,isActive:p},children:h})}function j({loading:t,children:e}){let n=(0,s.use)(d.LayoutRouterContext);return null===n?e:(0,i.jsx)(d.LayoutRouterContext.Provider,{value:{parentTree:n.parentTree,parentRenderTree:n.parentRenderTree,parentSegmentPath:n.parentSegmentPath,parentParams:n.parentParams,parentLoadingData:t,debugNameContext:n.debugNameContext,url:n.url,isActive:n.isActive},children:e})}function k({name:t,loading:e,children:n}){if(null!==e){let o=e[0],r=e[1],a=e[2];return(0,i.jsx)(s.Suspense,{name:t,fallback:(0,i.jsxs)(i.Fragment,{children:[r,a,o]}),children:n})}return(0,i.jsx)(i.Fragment,{children:n})}function P({parallelRouterKey:t,error:e,errorStyles:n,errorScripts:o,templateStyles:r,templateScripts:a,template:c,notFound:f,forbidden:x,unauthorized:v,segmentViewBoundaries:y}){let j=(0,s.useContext)(d.LayoutRouterContext);if(!j)throw Error("invariant expected layout router to be mounted");let{parentTree:O,parentRenderTree:S,parentSegmentPath:C,parentParams:T,parentLoadingData:E,url:M,isActive:R,debugNameContext:A}=j,I=O[0],F=null===C?[t]:C.concat([I,t]),z=O[1][t],L=S.slots?.get(t);(void 0===z||void 0===L)&&(0,s.use)(l.unresolvedThenable);let B=z[0],q=(0,m.createSegmentKey)(B),H=(0,h.useRouterBFCache)(z,L,q),D=[];do{let t=H.tree,s=H.renderTree,l=H.stateKey,m=t[0],h=T;if(Array.isArray(m)){let t=m[0],e=m[1],n=m[2],o=(0,b.getParamValueFromCacheKey)(e,n);null!==o&&(h={...T,[t]:o})}let y=function(t){if("/"===t)return"/";if("string"==typeof t)if("(__SLOT__)"===t)return;else return t+"/";return t[1]+"/"}(m),j=y??A,P=void 0===y?void 0:A,O=(0,i.jsxs)(w,{renderTree:s,children:[(0,i.jsx)(p.ErrorBoundary,{errorComponent:e,errorStyles:n,errorScripts:o,children:(0,i.jsx)(k,{name:P,loading:E,children:(0,i.jsx)(g.HTTPAccessFallbackBoundary,{notFound:f,forbidden:x,unauthorized:v,children:(0,i.jsxs)(u.RedirectBoundary,{children:[(0,i.jsx)(_,{url:M,tree:t,params:h,renderTree:s,segmentPath:F,debugNameContext:j,isActive:R&&l===q}),null]})})})}),null]}),S=(0,i.jsxs)(d.TemplateContext.Provider,{value:O,children:[r,a,c]},l);D.push(S),H=H.next}while(null!==H)return D}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},837457,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"default",{enumerable:!0,get:function(){return s}});let o=t.r(190809),r=t.r(843476),a=o._(t.r(271645)),i=t.r(8372);function s(){let t=(0,a.useContext)(i.TemplateContext);return(0,r.jsx)(r.Fragment,{children:t})}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},808341,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0});var o={cancelIdleCallback:function(){return i},requestIdleCallback:function(){return a}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let a="u">typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(t){let e=Date.now();return self.setTimeout(function(){t({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-e))}})},1)},i="u">typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(t){return clearTimeout(t)};("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},797689,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"createRenderParamsFromClient",{enumerable:!0,get:function(){return o}});let o=t.r(806831).createRenderParamsFromClient;("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},806831,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"createRenderParamsFromClient",{enumerable:!0,get:function(){return r}});let o=new WeakMap;function r(t){let e=o.get(t);if(e)return e;let n=Promise.resolve(t);return n.status="fulfilled",n.value=t,o.set(t,n),n}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},266996,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"createRenderSearchParamsFromClient",{enumerable:!0,get:function(){return o}});let o=t.r(793504).createRenderSearchParamsFromClient;("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},793504,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"createRenderSearchParamsFromClient",{enumerable:!0,get:function(){return r}});let o=new WeakMap;function r(t){let e=o.get(t);if(e)return e;let n=Promise.resolve(t);return n.status="fulfilled",n.value=t,o.set(t,n),n}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},479520,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0});var o={default:function(){return y},handleClientScriptLoad:function(){return b},initScriptLoader:function(){return x}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let a=t.r(555682),i=t.r(190809),s=t.r(843476),d=a._(t.r(174080)),l=i._(t.r(271645)),p=t.r(742732),c=t.r(922737),u=t.r(808341),g=t.r(519083),m=new Map,h=new Set,f=t=>{let{src:e,id:n,onLoad:o=()=>{},onReady:r=null,dangerouslySetInnerHTML:a,children:i="",strategy:s="afterInteractive",onError:l,stylesheets:p}=t,u=n||e;if(u&&h.has(u))return;if(m.has(e)){h.add(u),m.get(e).then(o,l);return}let g=()=>{r&&r(),h.add(u)},f=document.createElement("script"),b=new Promise((t,e)=>{f.addEventListener("load",function(e){t(),o&&o.call(this,e),g()}),f.addEventListener("error",function(t){e(t)})}).catch(function(t){l&&l(t)});a?(f.innerHTML=a.__html||"",g()):i?(f.textContent="string"==typeof i?i:Array.isArray(i)?i.join(""):"",g()):e&&(f.src=e,m.set(e,b)),(0,c.setAttributesFromProps)(f,t),"worker"===s&&f.setAttribute("type","text/partytown"),f.setAttribute("data-nscript",s),p&&(t=>{if(d.default.preinit)return t.forEach(t=>{d.default.preinit(t,{as:"style"})});if("u">typeof window){let e=document.head;t.forEach(t=>{let n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=t,e.appendChild(n)})}})(p),document.body.appendChild(f)};function b(t){let{strategy:e="afterInteractive"}=t;"lazyOnload"===e?window.addEventListener("load",()=>{(0,u.requestIdleCallback)(()=>f(t))}):f(t)}function x(t){t.forEach(b),[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(t=>{let e=t.id||t.getAttribute("src");h.add(e)})}function v(t){let{id:e,src:n="",onLoad:o=()=>{},onReady:r=null,strategy:a="afterInteractive",onError:i,stylesheets:c,...m}=t,{updateScripts:b,scripts:x,getIsSsr:v,appDir:y,nonce:w}=(0,l.useContext)(p.HeadManagerContext);w=m.nonce||w;let _=(0,l.useRef)(!1);(0,l.useEffect)(()=>{let t=e||n;_.current||(r&&t&&h.has(t)&&r(),_.current=!0)},[r,e,n]);let j=(0,l.useRef)(!1);if((0,l.useEffect)(()=>{if(!j.current){if("afterInteractive"===a)f(t);else"lazyOnload"===a&&("complete"===document.readyState?(0,u.requestIdleCallback)(()=>f(t)):window.addEventListener("load",()=>{(0,u.requestIdleCallback)(()=>f(t))}));j.current=!0}},[t,a]),("beforeInteractive"===a||"worker"===a)&&(b?(x[a]=(x[a]||[]).concat([{id:e,src:n,onLoad:o,onReady:r,onError:i,...m,nonce:w}]),b(x)):v&&v()?h.add(e||n):v&&!v()&&f({...t,nonce:w})),y){if(c&&c.forEach(t=>{d.default.preinit(t,{as:"style"})}),"beforeInteractive"===a)if(!n)return m.dangerouslySetInnerHTML&&(m.children=m.dangerouslySetInnerHTML.__html,delete m.dangerouslySetInnerHTML),(0,s.jsx)("script",{nonce:w,dangerouslySetInnerHTML:{__html:`(self.__next_s=self.__next_s||[]).push(${(0,g.htmlEscapeJsonString)(JSON.stringify([0,{...m,id:e}]))})`}});else return d.default.preload(n,m.integrity?{as:"script",integrity:m.integrity,nonce:w,crossOrigin:m.crossOrigin}:{as:"script",nonce:w,crossOrigin:m.crossOrigin}),(0,s.jsx)("script",{nonce:w,dangerouslySetInnerHTML:{__html:`(self.__next_s=self.__next_s||[]).push(${(0,g.htmlEscapeJsonString)(JSON.stringify([n,{...m,id:e}]))})`}});"afterInteractive"===a&&n&&d.default.preload(n,m.integrity?{as:"script",integrity:m.integrity,nonce:w,crossOrigin:m.crossOrigin}:{as:"script",nonce:w,crossOrigin:m.crossOrigin})}return null}Object.defineProperty(v,"__nextScript",{value:!0});let y=v;("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),e.exports=n.default)},27201,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"IconMark",{enumerable:!0,get:function(){return r}});let o=t.r(843476),r=()=>"u">typeof window?null:(0,o.jsx)("meta",{name:"«nxt-icon»"})},519083,(t,e,n)=>{Object.defineProperty(n,"__esModule",{value:!0});var o={ESCAPE_REGEX:function(){return i},htmlEscapeAttributeString:function(){return p},htmlEscapeJsonString:function(){return l}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let a={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},i=/[&><\u2028\u2029]/g,s={"&":"&amp;",'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;"},d=/[&"'<>]/g;function l(t){return t.replace(i,t=>a[t])}function p(t){return t.replace(d,t=>s[t])}},491915,(t,e,n)=>{function o(t,e={}){if(e.onlyHashChange)return void t();let n=document.documentElement;if("smooth"!==n.dataset.scrollBehavior)return void t();let r=n.style.scrollBehavior;n.style.scrollBehavior="auto",e.dontForceLayout||n.getClientRects(),t(),n.style.scrollBehavior=r}Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"disableSmoothScrollDuringRouteTransition",{enumerable:!0,get:function(){return o}})},12985,t=>{var e=t.i(924540),n=t.i(150361);function o(){(0,e.c)("[nuqs] Aborting queues"),n.t.abortAll(),n.n.abort().forEach(t=>n.t.queuedQuerySync.emit(t))}var r=t.i(271645),a=t.i(618566);let i=0;function s(){i=0,o()}function d(){--i<=0&&(i=0,queueMicrotask(o))}function l(){return(0,r.useEffect)(()=>(!function(){var t;if(t="next/app","u"<typeof history||(history.nuqs?.version&&"2.8.4"!==history.nuqs.version?(console.error((0,e.s)(409),history.nuqs.version,"2.8.4",t),!0):!!history.nuqs?.adapters?.includes(t)))return;let n=history.replaceState,o=history.pushState;history.replaceState=function(t,e,o){return d(),n.call(history,t,e,o)},history.pushState=function(t,e,n){return d(),o.call(history,t,e,n)},history.nuqs=history.nuqs??{version:"2.8.4",adapters:[]},history.nuqs.adapters.push("next/app")}(),window.addEventListener("popstate",s),()=>window.removeEventListener("popstate",s)),[]),null}let p=(0,e.n)(function(){let t=(0,a.useRouter)(),[n,o]=(0,r.useOptimistic)((0,a.useSearchParams)());return{searchParams:n,updateUrl:(0,r.useCallback)((n,a)=>{(0,r.startTransition)(()=>{a.shallow||o(n);let r=function(t){let{origin:n,pathname:o,hash:r}=location;return n+o+(0,e.o)(t)+r}(n);(0,e.c)("[nuqs next/app] Updating url: %s",r);let s="push"===a.history?history.pushState:history.replaceState;i=3,s.call(history,null,"",r),a.scroll&&window.scrollTo(0,0),a.shallow||t.replace(r,{scroll:!1})})},[]),rateLimitFactor:3,autoResetQueueOnUpdate:!1}});t.s(["NuqsAdapter",0,function({children:t,...e}){return(0,r.createElement)(p,{...e,children:[(0,r.createElement)(r.Suspense,{key:"nuqs-adapter-suspense-navspy",children:(0,r.createElement)(l)}),t]})}],12985)}],356376,t=>{t.v(e=>Promise.all(["static/chunks/106lmris-j2f5.js","static/chunks/347opop9iw4ek.js","static/chunks/2o-j239axd5om.js","static/chunks/0tsdu7s5hxsv-.js","static/chunks/2z42klatz6j58.js"].map(e=>t.l(e))).then(()=>e(667764)))},895773,t=>{t.v(e=>Promise.all(["static/chunks/0l4jimd9qs7wc.js","static/chunks/1l3hatnm64d4m.js","static/chunks/3_9ildsu5_50z.js","static/chunks/0puticv283dbm.js"].map(e=>t.l(e))).then(()=>e(871315)))},3303,(t,e,n)=>{e.exports=t.r(479520)}]);

//# debugId=335946e6-ae14-abe4-a90b-5d32b18ebe4a
