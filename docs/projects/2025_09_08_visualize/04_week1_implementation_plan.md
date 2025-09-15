# Week 1 Implementation Plan: Deployment Pipeline Validation

## Strategic Objective

Prove the deployment architecture works with minimal features, establishing confidence for complex visualization development. Create end-to-end pipeline from datadec data processing through LayerChart visualization on production domains.

## Final Architecture Decisions

### **Domain & Infrastructure**
- **Domain**: `bytomorrow.app` (purchased from Cloudflare)
- **Frontend**: SvelteKit on Vercel (`bytomorrow.app`)
- **Backend**: Python FastAPI on Railway (`api.bytomorrow.app`)
- **Database**: PostgreSQL on Railway
- **Data Source**: `datadec` library (published to PyPI)

### **Technology Stack**
- **Data Processing**: datadec (ML experiment analysis)
- **Backend Framework**: FastAPI with SQLAlchemy
- **Frontend Visualization**: LayerChart (line charts)
- **Database**: PostgreSQL with visualization caching
- **Authentication**: None (obscure URL path for privacy)

### **API Design**
- **Endpoint Structure**: `/api/visualize/data`
- **Visualization Type**: Line charts (ML scaling analysis)
- **Data Format**: JSON from pandas DataFrame
- **Caching Strategy**: PostgreSQL table for processed visualization data

## Week 1 Deliverables

### **Day 1-2: Infrastructure Setup**
**Domain Configuration**:
- [x] Domain purchased: `bytomorrow.app`
- [ ] DNS configured for frontend and API subdomain
- [ ] SSL certificates validated

**Platform Deployment**:
- [ ] Railway account setup with PostgreSQL database
- [ ] Vercel project connected to By Tomorrow repository
- [ ] Custom domains configured on both platforms

### **Day 3-4: Backend Implementation**
**FastAPI Service**:
- [ ] Basic FastAPI application structure
- [ ] Database connection and basic schema
- [ ] Health check endpoint: `GET /api/health`
- [ ] Data endpoint: `GET /api/visualize/data`

**datadec Integration**:
- [ ] datadec installed as PyPI dependency
- [ ] Sample dataset generation for testing
- [ ] Data transformation pipeline (pandas → JSON)

### **Day 5-7: Frontend Integration & Testing**
**SvelteKit Integration**:
- [ ] LayerChart library added to project
- [ ] API proxy endpoints in SvelteKit
- [ ] Basic line chart component implementation

**End-to-End Validation**:
- [ ] Data flows from datadec through FastAPI to LayerChart
- [ ] Chart renders correctly on production domain
- [ ] Privacy URL pattern implemented
- [ ] Performance validated (< 2s response times)

## Technical Implementation Details

### **Database Schema (Minimal)**
```sql
CREATE TABLE visualization_cache (
    id SERIAL PRIMARY KEY,
    query_hash VARCHAR(64) UNIQUE,
    data_json TEXT,
    chart_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **API Endpoint Specification**
```python
@app.get("/api/visualize/data")
async def get_visualization_data():
    """Return line chart data from datadec ML experiments"""
    # Load sample data using datadec
    dd = DataDecide(data_dir="./data")
    df = dd.easy_index_df(
        df_name="full_eval",
        data="C4",
        params=["150M", "1B", "4B"],  # Sample model sizes
        seed=0
    )
    
    # Transform for LayerChart
    chart_data = df.to_dict("records")
    return {"data": chart_data, "type": "line"}
```

### **Frontend Integration**
```svelte
<!-- Basic LayerChart line chart -->
<script lang="ts">
  import { LayerChart } from "layerchart"
  
  let chartData = []
  
  async function fetchData() {
    const response = await fetch('/api/visualize/data')
    const result = await response.json()
    chartData = result.data
  }
  
  onMount(fetchData)
</script>

<LayerChart 
  data={chartData} 
  type="line"
  x="model_size" 
  y="performance_metric" 
/>
```

## Success Criteria & Validation

### **Technical Validation**
- [ ] `curl https://api.bytomorrow.app/api/health` returns 200 OK
- [ ] `curl https://api.bytomorrow.app/api/visualize/data` returns valid JSON
- [ ] Line chart renders in browser at `https://bytomorrow.app/[privacy-path]/`
- [ ] Data processing completes in < 2 seconds
- [ ] SSL certificates valid on both domains

### **Process Validation**
- [ ] Code changes deploy to production within 10 minutes
- [ ] Database connection stable and performant
- [ ] No CORS errors in browser console
- [ ] Basic error handling and logging functional

### **Business Validation**
- [ ] Shareable URL works for stakeholder demos
- [ ] Visualization displays meaningful ML experiment data
- [ ] Platform ready for Week 2+ feature development

## Risk Mitigation Strategies

### **Deployment Risks**
**DNS propagation delays**: Use DNS checker tools, allow 24-48 hours
**Platform integration issues**: Test individual services before connecting
**Database connection problems**: Verify Railway PostgreSQL setup independently

### **Development Risks**
**datadec dependency issues**: Validate PyPI package works in Railway environment
**LayerChart integration complexity**: Start with simplest possible chart
**Data format mismatches**: Test pandas → JSON → LayerChart pipeline locally first

### **Timeline Risks**
**Platform learning curve**: Focus on minimal viable implementation
**Scope creep**: Defer any features beyond basic line chart
**Authentication complexity**: Stick to obscure URL approach for Week 1

## Environment Configuration

### **Railway Environment Variables**
```env
DATABASE_URL=postgresql://[auto-generated-by-railway]
CORS_ORIGINS=https://bytomorrow.app
DATA_DIR=./data
PYTHON_VERSION=3.11
```

### **Vercel Environment Variables**
```env
VITE_API_BASE_URL=https://api.bytomorrow.app
VITE_PRIVACY_PATH=coldbrewbubbletea
VITE_ENABLE_LOGGING=true
```

## Week 1 Timeline

### **Monday-Tuesday: Infrastructure**
- Domain DNS configuration
- Platform account setup and basic deployment
- Database provisioning and connection testing

### **Wednesday-Thursday: Backend Development**
- FastAPI application with basic endpoints
- datadec integration and sample data generation
- Database schema creation and basic caching

### **Friday-Weekend: Frontend Integration**
- LayerChart integration in SvelteKit
- API consumption and chart rendering
- End-to-end testing and performance validation

## Success Metrics

**Deployment Confidence**: Can ship code changes to production reliably
**Data Pipeline**: ML experiment data flows through entire stack
**Performance**: Visualization loads in under 2 seconds
**Accessibility**: Stakeholders can access and view meaningful charts

**Key Insight**: Week 1 success measured by architectural confidence, not feature completeness. Goal is proving the deployment pipeline works before investing in complex visualization development.