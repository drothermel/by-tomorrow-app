# Deployment Details: SvelteKit + FastAPI + PostgreSQL Stack

## Strategic Overview

Complete deployment guide for the By Tomorrow visualization platform using separated platform deployment (Vercel + Railway) with custom domain integration and production-ready configuration.

## Architecture Components

### Service Distribution
```
yourdomain.com (Vercel)
├── SvelteKit Frontend
├── LayerChart Visualizations
└── API Proxy to Backend

api.yourdomain.com (Railway)  
├── Python FastAPI Backend
├── Research Data Processing
├── PDF Content Extraction
└── Visualization Data Generation

Database & Storage (Railway)
├── PostgreSQL (Research + Cache)
└── File Storage (PDFs, uploads)
```

## Domain Registration & DNS Configuration

### Domain Registration (Cloudflare Registrar)
**Cost**: $8.03/year for .com domains
**Process**:
1. Register domain at Cloudflare Registrar
2. Domain automatically added to Cloudflare DNS
3. Built-in DDoS protection and DNSSEC enabled

**Why Cloudflare**:
- Transparent at-cost pricing (no renewal surprises)
- Global DNS infrastructure for fast resolution
- Integrated security features
- Perfect compatibility with deployment platforms

### DNS Configuration
**Frontend (Vercel)**:
```dns
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

**Backend (Railway)**:
```dns
Type: CNAME
Name: api
Value: g05ns7.up.railway.app (provided by Railway)
```

## Platform Setup & Configuration

### Vercel (Frontend Deployment)

**Plan Selection**:
- **Development**: Free Hobby Plan
- **Production**: Pro Plan ($20/month)

**Configuration Steps**:
1. Connect GitHub repository to Vercel
2. Auto-detection configures SvelteKit build
3. Add custom domain in Settings → Domains
4. Configure environment variables for API endpoints

**Environment Variables**:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_ENABLE_LOGGING=true
```

**Build Settings** (auto-configured):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install"
}
```

### Railway (Backend + Database)

**Plan Selection**:
- **Development**: Hobby Plan ($5/month) 
- **Production**: Pro Plan ($20/month)

**Service Configuration**:

**Python FastAPI Service**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**PostgreSQL Database**:
- One-click PostgreSQL addon in Railway
- Automatic connection string generation
- Built-in connection pooling and backups

**Environment Variables**:
```env
DATABASE_URL=postgresql://username:password@host:port/dbname
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SECRET_KEY=your-secret-key
PYTHON_VERSION=3.11
```

## Deployment Process Walkthrough

### Initial Setup Timeline (Day 1: 2-4 hours)

**Phase 1: Domain & DNS (30 minutes)**
1. Register domain with Cloudflare ($8.03)
2. Configure DNS records for both services
3. Verify DNS propagation (10-30 minutes)

**Phase 2: Backend Deployment (60-90 minutes)**
1. Create Railway account and new project
2. Deploy FastAPI service from GitHub repository
3. Add PostgreSQL database to project
4. Configure custom domain (api.yourdomain.com)
5. Set environment variables and test API endpoints

**Phase 3: Frontend Deployment (30-60 minutes)**
1. Create Vercel account and connect GitHub repository
2. Auto-deploy SvelteKit application
3. Add custom domain (yourdomain.com)
4. Configure environment variables pointing to Railway API
5. Test end-to-end API communication

**Phase 4: SSL & Security (automatic)**
- SSL certificates automatically provisioned
- HTTPS enforced on both domains
- Security headers configured

### Development Workflow

**Local Development**:
```bash
# Backend (Python FastAPI)
cd python-backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (SvelteKit)  
cd sveltekit-frontend
npm install
npm run dev
```

**Deployment Process**:
```bash
# Automatic deployment on git push
git add .
git commit -m "Add visualization features"
git push origin main

# Railway and Vercel auto-deploy from main branch
# Check deployment status in respective dashboards
```

## Pricing Breakdown

### Annual Costs
| Service | Plan | Cost |
|---------|------|------|
| Domain (Cloudflare) | Registration | $8.03/year |
| DNS (Cloudflare) | Free | $0/year |
| SSL Certificates | Auto | $0/year |

### Monthly Hosting Costs

**Development Phase**:
| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby (Free) | $0/month |
| Railway | Hobby | $5/month |
| **Total** | | **$5/month** |

**Production Phase**:
| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20/month |
| Railway | Hobby | $5/month |
| **Total** | | **$25/month** |

**Scaled Production** (if needed):
| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20/month |
| Railway | Pro | $20/month |
| **Total** | | **$40/month** |

### First-Year Total Cost Projection:
- **Development**: $68 ($8 domain + $60 hosting)
- **Production**: $308 ($8 domain + $300 hosting)
- **Scaling contingency**: Add $180/year for Railway Pro upgrade

## Performance & Monitoring

### Expected Performance Metrics
**Frontend (Vercel)**:
- Global CDN with <100ms response times
- 99.9% uptime SLA
- Automatic image optimization and compression

**Backend (Railway)**:
- <500ms API response times (CRUD operations)
- <2s visualization data processing (with caching)
- PostgreSQL connection pooling for scalability

### Monitoring Setup
**Vercel Analytics**:
- Web Vitals tracking
- Real User Monitoring (RUM)
- Performance insights dashboard

**Railway Monitoring**:
- Application metrics and logging
- Database performance monitoring
- Custom alerting for error rates

**External Monitoring** (recommended):
- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry integration)
- Performance monitoring (New Relic, DataDog)

## Security Configuration

### CORS Configuration (FastAPI)
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://yourdomain.com",
        "https://www.yourdomain.com"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
```

### Environment Security
- All secrets stored in platform environment variables
- Database connection strings encrypted in transit
- API keys never committed to version control
- HTTPS enforced across all services

### Authentication Strategy (Future)
- JWT tokens for API authentication
- OAuth integration for user management
- Rate limiting for API endpoints
- Input validation and sanitization

## Scaling Considerations

### Traffic Growth Patterns
**Vercel Scaling**:
- Automatic scaling for frontend traffic
- Global edge network distribution
- Usage-based billing for overages

**Railway Scaling**:
- Horizontal scaling available on Pro plan
- Database read replicas for query performance
- Background job processing with queues

### Cost Optimization
**Development Phase**:
- Use free tiers maximum capacity
- Monitor usage dashboards
- Implement caching early to reduce compute costs

**Production Scaling**:
- Upgrade platforms incrementally based on actual usage
- Monitor key metrics: API calls, database queries, bandwidth
- Implement efficient caching strategies for visualization data

## Troubleshooting Guide

### Common Deployment Issues
**DNS Propagation Delays**:
- Wait 24 hours for global propagation
- Use DNS checker tools to verify resolution
- Test from different geographic locations

**CORS Errors**:
- Verify origin URLs match exactly (https vs http)
- Check environment variable configuration
- Test API endpoints directly before frontend integration

**SSL Certificate Issues**:
- Usually resolve automatically within 10 minutes
- Verify domain ownership in platform dashboards
- Check DNS records are correctly configured

### Performance Debugging
**Slow API Responses**:
- Check database query performance
- Implement query result caching
- Monitor Railway resource usage

**Frontend Loading Issues**:
- Verify Vercel deployment status
- Check network tab for failed API requests
- Test API endpoints directly

## Migration & Backup Strategy

### Data Backup
**PostgreSQL Backups**:
- Railway provides automatic daily backups
- Manual backup exports available
- Point-in-time recovery support

**Code Repository**:
- GitHub provides version control and backup
- Both platforms deploy from Git repositories
- Easy rollback to previous deployments

### Platform Migration Strategy
**Exit Strategy**:
- Docker containers provide portability
- Database exports in standard PostgreSQL format
- Static assets easily moved between CDNs

**Scaling Migration**:
- Move to dedicated infrastructure if needed
- Container-based deployment enables platform flexibility
- Database migration tools available for PostgreSQL