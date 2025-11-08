# Data & API Integration Guide

## For Frontend Developers

### Mock Data Location
- All mock/fake data is stored in `/data` folder
- Each data type has its own file (e.g., `executiveMembers.js`, `events.js`)
- Import directly: `import { executiveMembers } from '@/data/executiveMembers'`

### Usage Example
```javascript
import { executiveMembers } from '@/data/executiveMembers';

export default function ExecutiveCommittee() {
  return (
    <div>
      {executiveMembers.map(member => (
        <div key={member.id}>{member.name}</div>
      ))}
    </div>
  );
}
```

---

## For Backend Developers

### API Integration Points
All API calls are centralized in `/lib/api.js`

### Migration Steps
1. Create your API endpoints in `/app/api/` folder
2. Update the corresponding function in `/lib/api.js`
3. Replace mock data imports with actual fetch calls
4. No need to touch frontend components!

### Example Migration
**Before (Mock Data):**
```javascript
export async function getExecutiveMembers() {
  const { executiveMembers } = await import('@/data/executiveMembers');
  return executiveMembers;
}
```

**After (Real API):**
```javascript
export async function getExecutiveMembers() {
  const res = await fetch(`${process.env.API_URL}/api/executive-committee`, {
    cache: 'no-store' // or revalidate based on needs
  });
  if (!res.ok) throw new Error('Failed to fetch members');
  return res.json();
}
```

### Data Schema
Each data file includes the expected schema as TypeScript-style comments.
Match this schema in your MongoDB collections.

---

## Folder Structure
```
/data               # Mock data (frontend uses this)
  - executiveMembers.js
  - events.js
  - achievements.js

/lib                # API utilities (backend updates this)
  - api.js

/app/api            # Backend API routes (backend creates this)
  - executive-committee/route.js
  - events/route.js
```

## Benefits of This Approach
✅ Frontend can work independently with mock data
✅ Backend can develop APIs without breaking frontend
✅ Easy migration: just update `/lib/api.js`
✅ Type-safe data structure defined upfront
✅ No component changes needed when switching to real API
