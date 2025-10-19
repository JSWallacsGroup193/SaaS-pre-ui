## Multi-Language & Localization

**Priority**: Nice to Have

**Database Schema**:
```sql
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language_code VARCHAR(10) NOT NULL,  -- 'en', 'es', 'fr', 'de', 'zh'
  namespace VARCHAR(50),  -- 'common', 'work_orders', 'inventory'
  key VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language_code, namespace, key)
);

CREATE TABLE user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'UTC',
  date_format VARCHAR(20) DEFAULT 'MM/DD/YYYY',
  number_format VARCHAR(20) DEFAULT 'en-US',
  currency VARCHAR(10) DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**i18n Implementation (React)**:
```typescript
// i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: {
          welcome: 'Welcome',
          work_orders: 'Work Orders',
          inventory: 'Inventory'
        },
        work_orders: {
          create_new: 'Create New Work Order',
          status_completed: 'Completed',
          assigned_to: 'Assigned to {{name}}'
        }
      },
      es: {
        common: {
          welcome: 'Bienvenido',
          work_orders: 'Órdenes de Trabajo',
          inventory: 'Inventario'
        },
        work_orders: {
          create_new: 'Crear Nueva Orden de Trabajo',
          status_completed: 'Completado',
          assigned_to: 'Asignado a {{name}}'
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Usage in components
function WorkOrderList() {
  const { t } = useTranslation('work_orders');
  
  return (
    <div>
      <h1>{t('common:work_orders')}</h1>
      <button>{t('create_new')}</button>
      
      {workOrders.map(wo => (
        <div key={wo.id}>
          <span>{t('status_' + wo.status)}</span>
          <span>{t('assigned_to', { name: wo.technician.name })}</span>
        </div>
      ))}
    </div>
  );
}
```

**Benefits**:
- Support international markets
- Better user experience for non-English speakers
- Compliance with local regulations
- Increased market reach

---

