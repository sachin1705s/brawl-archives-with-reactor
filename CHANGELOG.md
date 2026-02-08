## [2026-02-07]
### Added
- Added a WorldCore UI field to paste a Reactor API key without editing `.env.local`.

### Changed
- Extended the WorldCore token endpoint to accept API keys supplied from the UI.

## [2026-02-08]
### Added
- Added a timeline-driven WorldCore flow that auto-starts streams and advances cards.
- Added a backend timeline endpoint and starter timeline assets for card backgrounds and starting images.
- Added a full-screen experience page for the WorldCore interaction window.

### Changed
- Replaced the WorldCore landing page with the timeline experience layout and timed flow.
- Moved the interactive stream into the dedicated experience route and made the enter button compact.
- Adjusted the timeline and experience UI to match the reference card overlay style.
- Updated the experience flow to advance between streams without returning to the timeline page.

### Fixed
- Fixed a missing router reference in the experience page when advancing streams.

### Changed
- Added a Back button in the experience view and moved the Next button into the lower card area with a larger size.
- Reworked the main page into a multi-timeline explorer grid.
- Added two additional timelines and renamed the main title/subtitle to Brawl Archives.
- Added key usage hints beside the WASD and IJKL controls.
- Removed the WorldCore header section and local model toggle from the main page, and made the explorer scrollable.

### Added
- Added a global background music toggle with looping audio.
