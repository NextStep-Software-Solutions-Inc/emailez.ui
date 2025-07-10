import { Input } from "@/components/ui/input";

export function GeneralTab({ formData, handleInputChange }: {
  formData: any;
  handleInputChange: (field: string, value: string | boolean | number) => void;
})
{


  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
    
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              Organization ID
            </label>
            <Input
              readOnly
              disabled
              id="id"
              value={formData.id}
              onChange={(e) => handleInputChange('id', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
           <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
              Domain
            </label>
            <Input
              readOnly
              disabled
              id="domain"
              value={formData.domain}
              onChange={(e) => handleInputChange('domain', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="example.com"
            />
          </div>
          <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <Input
            type="email"
            id="contactEmail"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        </div>
        
      </div>
    </div>
  );
}
