# Current Goal: Research Workflow Implementation

## User's Target Workflow

I'm working on a research project and I have some literature that I know about, with some key pieces and figures that I'd like to reference in a note about the topic (and probably also in individual personal notes about the paper). I'd like to be able to easily tag the papers and browse my "related work notes" along with highlighted sections or figures that can link back to the paper text. I would love to be able to set a "default view" for each paper where I select some sections to be visible and hide everything else, and maybe add some annotations with my notes.

Then, I'm also running experiments on this project, so I'd like to be able to take notes on my questions, findings, concrete results and todos. I want those notes to have automatically created metadata (date, current project, etc) and to be editable, and to be able to reference the related work or other notes, and to have version control. I'd like to be able to embed images.

And none of these features have to be amazing, but I want to be sure that a mistake won't lead to all the data disappearing and that I'll be able to find the things & have them formatted in a consumable way going forward.

## Current Capabilities vs Needs

### ✅ What exists:
- Paper storage (PaperMetadata, PaperData models)
- Basic document/note models (Document, Question, Claim, Topic, Snippet)
- PDF viewer component
- arXiv search & library management
- Basic tagging system (tags field on most models)
- Cross-referencing system (linkedPapers, linkedQuestions, etc.)

### 🔨 What needs building:

#### Literature workflow:
1. **PDF annotation system** - highlight sections, attach notes to specific text
2. **Custom paper views** - save show/hide preferences per paper  
3. **Enhanced tagging & filtering** - browse "related work" by tags
4. **Section-level notes** - attach thoughts to specific paper sections

#### Experiment notes:
1. **Enhanced note editor** - structured notes with rich formatting
2. **Auto metadata** - date, project, experiment phase
3. **Image embedding** - for results, figures, screenshots
4. **Note versioning** - track changes over time
5. **Cross-referencing** - easy links between notes and papers

#### Data safety:
1. **Export functionality** - backup as JSON/Markdown
2. **Database snapshots** - automated backups
3. **Version history** - never lose work

## Implementation Sequence

### 🎯 Phase 1: Enhanced Note-Taking System (CURRENT FOCUS)
**Priority: Immediate**

- Extend the Document model for structured research notes
- Add automatic metadata (date, project, tags)
- Build improved editor interface with rich formatting
- Enable image embedding
- Implement basic version history

**Why first:** Enables both literature notes AND experiment notes immediately, providing the most workflow value right away.

### Phase 2: Project Organization & Data Safety
**Priority: Next 1-2 weeks**

- Add Project model to group papers and notes
- Implement JSON export functionality for data backup
- Create database snapshot system
- Build project-based filtering and navigation

### Phase 3: PDF Annotation System
**Priority: Weeks 2-3**

- Implement text highlighting in PDF viewer
- Create annotation attachment system
- Build note-to-text linking
- Enable section-level commenting

### Phase 4: Custom Paper Views
**Priority: Weeks 3-4**

- Save show/hide preferences per paper
- Create custom section filtering
- Build personalized paper reading interface
- Add quick annotation overlays

### Phase 5: Advanced Cross-Referencing
**Priority: Month 2+**

- Enhanced linking between notes and papers
- Smart suggestion system for related content
- Visual connection mapping
- Advanced search across all content types

### Phase 6: Production Deployment
**Priority: After Phase 1 complete**

- Deploy to custom domain for anywhere access
- Set up hosted PostgreSQL database
- Implement cloud file storage for images
- Add authentication system
- Configure automated backups

**Estimated effort:** 2-4 hours using Vercel + Supabase stack.

## Success Metrics

By the end of Phase 1, the user should be able to:
- Create structured experiment notes with auto-metadata
- Embed images of experimental results
- Reference papers from notes seamlessly
- Never lose work due to robust data handling
- Export all data for backup purposes

By the end of Phase 6, the user should be able to:
- Access their research notes from anywhere
- Never worry about local data loss
- Share specific notes or papers with collaborators
- Have confidence in system reliability and backups

This foundation will enable immediate productivity while building toward the complete research workflow vision.