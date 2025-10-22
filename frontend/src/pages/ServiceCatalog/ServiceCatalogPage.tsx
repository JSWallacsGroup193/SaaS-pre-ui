import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServicesTab } from './components/ServicesTab';
import { BundlesTab } from './components/BundlesTab';
import { LaborRatesTab } from './components/LaborRatesTab';

export function ServiceCatalogPage() {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Service Catalog & Pricebook</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your services, bundles, and labor rates
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="bundles">Bundles</TabsTrigger>
          <TabsTrigger value="labor-rates">Labor Rates</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="bundles">
          <BundlesTab />
        </TabsContent>

        <TabsContent value="labor-rates">
          <LaborRatesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
