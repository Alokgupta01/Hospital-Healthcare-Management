# Genomic Data Visualization Experience
 
**Mini Project-1** &middot; Semester V &middot; GLA University, Mathura
Department of Computer Engineering & Applications
**Guide:** Mr. Anurag Das &middot; **Batch:** 8 &middot; **Section:** 3 GA
 
An interactive, browser-based tool to explore genomic variants through zoomable chromosome and variant tracks,
with client-side filtering and a detailed variant-information panel. Built entirely with HTML, CSS and JavaScript
using the Canvas API — no server, no installation, no external framework.
 
> The bundled dataset is **synthetic** (randomly generated for demonstration purposes only) and is not real
> patient data. Gene coordinates and centromere positions are approximate GRCh38 values used for display.
 
---
 
## Team
 
| # | Name | Roll No. | Role |
|---|------|----------|------|
| 1 | Vishwas Parashar | 2415001804 | Project Lead & Frontend Developer |
| 2 | Yash | 2415001820 | Visualization & Rendering Developer |
| 3 | Uppuluri Sri Praneeth | 2315002348 | Data & Genomic Analysis Developer |
| 4 | Vishesh Dwivedi | 2415001794 | Backend / Testing & Documentation |
 
## Project description
 
The project provides scientific visualization of genomic datasets through an interactive, zoomable
chromosome-based track view. Custom tracks represent chromosomes, genomic regions and variants so their
distribution and location can be understood at a glance. Real-time, client-side filtering lets users search
and analyze variants by type, impact and allele frequency without any server round trip.
 
## Objectives
 
- Interactive, zoomable visualization of chromosomes, genomic regions and variants
- Efficient in-memory data handling with instant client-side filtering and search
- A variant-detail panel showing chromosome, position, reference/alternate allele and other attributes
- Smooth, custom client-side rendering for zooming, navigation and selection on large datasets
## Features
 
- **Genome overview** — all 24 chromosomes as density-coloured bars; click one to open it
- **Zoomable chromosome view** — ruler, chromosome ideogram with centromere, gene track, density histogram, variant track
- **Interaction** — mouse-wheel zoom, drag to pan, double-click to zoom, keyboard shortcuts, click-to-jump on the chromosome bar
- **Variant markers** — colour = impact (High / Moderate / Low / Modifier), shape = type (SNP / Insertion / Deletion / MNP), height = allele frequency
- **Client-side filtering** — free-text search, impact, variant type, allele-frequency range
- **Variant details panel** — chromosome, position, REF/ALT, type, impact, allele frequency, gene, consequence
- **Locus / gene / variant search** — e.g. `chr17:7,600,000-7,700,000`, `TP53`, `VAR00100`
- **Load your own dataset** — CSV or JSON, with validation and a report of any skipped rows
- **Export** — filtered variants (CSV / JSON), variants in the current view (CSV), current view as an image (PNG)
- **Shareable view** — the URL records the chromosome, window and selected variant
## Tools & technologies
 
HTML5 &middot; CSS3 &middot; JavaScript &middot; Canvas API &middot; CSV/JSON datasets &middot; VS Code &middot; Git/GitHub
 
## Project structure
 
```
Genomic-Data-Visualization-Experience/
  index.html
  css/
    style.css              layout, typography, UI components
    visualization.css      canvas containers, legend, tooltip
  js/
    genome.js               reference genome constants
    parser.js                CSV / JSON parsing and validation
    data.js                   variant store, indexing, filters, statistics
    tracks.js                 track drawing functions
    renderer.js               interactive chromosome view
    overview.js                genome overview canvas
    export.js                  CSV / JSON / PNG export
    state.js                    URL hash + saved filters
    ui.js                        interface (filters, table, details, tooltip)
    app.js                        connects every module
  data/
    dataset.js               built-in demo dataset
    variants.csv              same data as CSV
  tools/
    generate_dataset.py       script that generated the demo dataset
  tests/                      automated unit tests (open tests/tests.html)
  docs/                        user guide, technical docs, team work division
```
 
## How to run
 
Download or clone the repository, then open `index.html` in any modern browser (Chrome, Edge, Firefox).
No installation or build step is required.
 
To run the automated test suite, open `tests/tests.html`.
 
## Documentation
 
- [User Guide](docs/USER_GUIDE.md)
- [Technical Documentation](docs/TECHNICAL_DOCS.md)
- [Team Work Division](docs/TEAM_WORK.md)
## Expected outcome
 
An interactive tool for exploring genomic datasets with smooth, scalable client-side rendering, real-time
filtering, and a detailed view of any selected variant — usable directly in a web browser with no installation.
 
## Future scope
 
Larger/real-time dataset support, advanced filters (position, allele-frequency bins), additional visualizations
(mutation heat-maps, comparative chromosome views), cloud/database integration, richer export and reporting
(PDF), and performance work such as Web Workers and progressive rendering.
 
## License
 
Academic project submitted for Mini Project-1, GLA University. For educational use only.
 