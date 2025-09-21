# Deployment Architecture: By Tomorrow Research Platform

## Overview

By Tomorrow is a research paper management and data visualization platform with a **separated frontend/backend architecture** optimized for flexible data analysis and interactive visualizations.

## Current Architecture (Week 1 - Production Ready)

### **Domain & DNS Configuration**
- **Primary Domain**: `bytomorrow.app` (purchased via Cloudflare)
- **Frontend**: `https://bytomorrow.app` (SvelteKit on Vercel)
- **Backend API**: `https://api.bytomorrow.app` (Python FastAPI on Railway)
- **SSL**: Automatically managed by both platforms
- **DNS**: Cloudflare with DDoS protection and global CDN

### **Frontend: SvelteKit on Vercel**
```
Technology Stack:
├── SvelteKit (TypeScript)
├── LayerChart (data visualization)
├── TailwindCSS (styling)
├── Prisma Client (research paper data)
└── Melt UI / bits-ui (components)

Deployment:
├── Auto-deploy from GitHub main branch
├── Node.js 20 runtime
├── Custom domain: bytomorrow.app
└── Environment: production API endpoints
```

**Current Routes**:
- `/` - Homepage with feature overview
- `/search` - arXiv paper search
- `/library` - Research paper management  
- `/reader` - PDF viewing and annotation
- `/editor` - Document composition
- `/coldbrewbubbletea/` - Data visualization (privacy URL)

### **Backend: Python FastAPI on Railway**
```
Technology Stack:
├── Python 3.12 + FastAPI
├── PostgreSQL (managed by Railway)
├── datadec (ML experiment data processing)
├── pandas/numpy (data manipulation)
└── SQLAlchemy (database ORM)

Deployment:
├── Auto-deploy from GitHub python-backend/
├── uv package manager + pyproject.toml
├── Custom domain: api.bytomorrow.app
└── Environment: DATABASE_URL + CORS configuration
```

**Current API Endpoints**:
- `GET /api/health` - Service health check
- `GET /api/visualize/data` - Main dataset (9MB parquet)
- `GET /api/visualize/data/ft` - Combined dataset (pkl file)
- `GET /api/visualize/data/unmelted` - Pivot table format
- `GET /api/visualize/data/small` - Filtered subset

### **Database: PostgreSQL on Railway**
```
Current Usage:
├── Research paper metadata (Prisma schema)
├── Visualization cache table (prepared but unused)
├── File-based data serving (parquet/pkl files in Git)
└── Connection: Shared between FastAPI and SvelteKit
```

### **Data Flow (Current)**
```
1. Local Development:
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
   │ ML Experiments  │ →  │ pandas/datadec  │ →  │ parquet/pkl     │
   │ (raw results)   │    │ (processing)    │    │ (commit to Git) │
   └─────────────────┘    └─────────────────┘    └─────────────────┘

2. Production Serving:
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
   │ API Request     │ →  │ Load file +     │ →  │ JSON Response   │
   │ (frontend)      │    │ Filter/Process  │    │ (to LayerChart) │
   └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Planned Architecture Evolution (Week 2+)

### **Target State: Database-Driven API**

#### **Enhanced Data Pipeline**
```
Local Processing Pipeline:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ ML Experiments  │ →  │ Heavy Processing │ →  │ PostgreSQL      │
│ (raw results)   │    │ (local machine)  │    │ (Railway DB)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                            │
                            ▼
                    ┌─────────────────┐
                    │ Upload Script   │
                    │ - Data cleaning │
                    │ - Transformations│
                    │ - Bulk insert   │
                    └─────────────────┘

Production Serving:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ API Request     │ →  │ SQL Query       │ →  │ JSON Response   │
│ (?params=60M)   │    │ (indexed, fast) │    │ (filtered data) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### **Database Schema Evolution**
```sql
-- Target schema for experiment results
CREATE TABLE experiment_results (
    id SERIAL PRIMARY KEY,
    params VARCHAR(10) NOT NULL,           -- "60M", "150M", "1B"
    params_numeric BIGINT NOT NULL,        -- 60000000, 150000000, 1000000000
    step INTEGER NOT NULL,                 -- Training step
    metric VARCHAR(50) NOT NULL,           -- "pile-valppl", "accuracy", etc.
    value FLOAT,                          -- Metric value (nullable)
    data_source VARCHAR(50) NOT NULL,      -- "Dolma1.7", "C4", etc.
    compute FLOAT,                        -- Compute used
    timestamp TIMESTAMP,                  -- Experiment timestamp
    created_at TIMESTAMP DEFAULT NOW()
);

-- Optimized indexes for common query patterns
CREATE INDEX idx_params ON experiment_results(params);
CREATE INDEX idx_data_source ON experiment_results(data_source);
CREATE INDEX idx_metric ON experiment_results(metric);
CREATE INDEX idx_data_params_metric ON experiment_results(data_source, params, metric);
```

#### **Enhanced API Endpoints**
```python
# Flexible, SQL-powered endpoints
GET /api/visualize/data?data_source=Dolma1.7&params=60M,150M&metric=pile-valppl
GET /api/visualize/aggregated?group_by=params&metric=accuracy
GET /api/visualize/scaling?x_axis=params_numeric&y_axis=pile-valppl
GET /api/visualize/table?limit=1000&offset=0&sort=step

# Performance optimizations
- SQL query optimization with indexes
- Response caching for expensive aggregations
- Pagination for large result sets
- Real-time filtering without file I/O
```

## Development Workflow

### **Current Workflow (Week 1)**
```bash
# Code changes
git add . && git commit -m "Add new feature"
git push origin main

# Automatic deployments
- Vercel: SvelteKit frontend (~2 minutes)
- Railway: FastAPI backend (~3 minutes)

# Testing
curl https://api.bytomorrow.app/api/health
open https://bytomorrow.app/coldbrewbubbletea/
```

### **Planned Workflow (Week 2+)**
```bash
# Data pipeline (local machine)
python scripts/process_experiments.py     # Heavy ML data processing
python scripts/upload_to_postgres.py     # Bulk upload to Railway DB

# API development
git push origin main                      # Deploy API changes
curl "https://api.bytomorrow.app/api/visualize/data?params=60M"  # Test queries

# Frontend development  
npm run dev                              # Local dev with production API
git push origin main                     # Deploy frontend changes
```

## Cost Structure & Scaling

### **Current Costs (Monthly)**
```
Domain:          $0.67/month  (bytomorrow.app via Cloudflare)
Frontend:        $0/month     (Vercel Free/Hobby tier)
Backend:         $5/month     (Railway Hobby tier)
Database:        $0.002/month (9MB data @ $0.25/GB)
Total:           ~$6/month
```

### **Scaling Thresholds**
```
Database Storage Costs (Railway @ $0.25/GB/month):
├── Current (9MB):     ~$0.002/month
├── 1 GB:              $0.25/month  
├── 10 GB:             $2.50/month
├── 100 GB:            $25/month
└── 250 GB (limit):    $62.50/month

Alternative (Cloudflare R2 @ $0.015/GB/month):
├── 100 GB:            $1.50/month (95% cheaper)
├── 1 TB:              $15/month
└── Unlimited scale
```

**Migration Trigger**: Consider blob storage (R2) + database metadata when exceeding 20-50 GB

## Security & Privacy

### **Current Security Model**
- **Public API endpoints** - no authentication required
- **Privacy through obscurity** - visualization at `/coldbrewbubbletea/`
- **CORS protection** - only allows requests from bytomorrow.app domains
- **SSL everywhere** - HTTPS enforced on all domains

### **Planned Security Enhancements**
- **API key authentication** for sensitive endpoints
- **Rate limiting** for public APIs
- **Request logging** and monitoring
- **User authentication** for multi-user scenarios

## Monitoring & Performance

### **Current Monitoring**
- **Railway logs** - FastAPI application logs and errors
- **Vercel analytics** - Frontend performance and usage
- **Manual testing** - Health checks and API response times

### **Performance Targets**
```
Response Times:
├── Health check:        <50ms
├── Simple data query:   <200ms  
├── Complex aggregation: <500ms
└── Full dataset load:   <2s

Memory Usage:
├── FastAPI backend:     <512MB (Railway Hobby limit)
├── Database queries:    <100MB peak
└── Frontend bundle:     <5MB gzipped
```

## Backup & Recovery

### **Current Backup Strategy**
- **Code**: Git repositories (GitHub)
- **Database**: Railway automatic backups (daily)
- **Data files**: Committed to Git (version controlled)
- **Configuration**: Environment variables documented

### **Planned Backup Strategy**
- **Database**: Railway automatic backups + manual exports
- **Processed data**: Local backup of upload scripts and source data
- **Configuration**: Infrastructure as code documentation
- **Disaster recovery**: Documented restoration procedures

## Future Architecture Considerations

### **Phase 3: Advanced Features (Month 2+)**
- **Multi-user authentication** and workspace isolation
- **Real-time collaborative features** for research teams
- **Advanced ML features** - automated insights, pattern detection
- **Integration APIs** - Weights & Biases, MLflow, experiment tracking
- **Mobile-responsive** visualization dashboard

### **Phase 4: Scale & Performance (Month 6+)**
- **Microservices architecture** - separate processing and serving
- **Caching layer** - Redis for frequently accessed data
- **CDN optimization** - Global content delivery for visualizations
- **Horizontal scaling** - Multiple backend instances
- **Advanced monitoring** - APM, error tracking, performance metrics

## Development Team Onboarding

### **Repository Structure**
```
by-tomorrow-app/
├── src/                    # SvelteKit frontend
├── python-backend/         # FastAPI backend
├── prisma/                 # Database schema (research papers)
├── docs/                   # Project documentation
├── DEPLOYMENT_ARCH.md      # This file
├── CLAUDE.md              # Development guidelines
└── package.json           # Frontend dependencies
```

### **Getting Started**
1. **Clone repository**: `git clone https://github.com/drothermel/by-tomorrow-app`
2. **Frontend setup**: `npm install && npm run dev`
3. **Backend setup**: `cd python-backend && uv sync && uv run uvicorn main:app --reload`
4. **Environment**: Copy `.env.example` to `.env.local` with API endpoints
5. **Deploy**: Push to main branch for automatic deployment

### **Key Documentation**
- `docs/projects/2025_09_08_visualize/` - Complete architecture planning
- `CLAUDE.md` - Development coding standards and guidelines
- `README.md` - Basic project setup and feature overview
- `python-backend/README.md` - Backend-specific setup instructions

---

**Last Updated**: December 2024 (Week 1 implementation complete)
**Next Review**: After Week 2 database migration implementation