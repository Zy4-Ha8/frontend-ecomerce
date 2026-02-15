import { useState } from 'react';
import Select from 'react-select';

export default function ReactSelectExamples() {
  // Example 1: Basic Multi-Select for Colors
  const [selectedColors, setSelectedColors] = useState([]);
  
  const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
    { value: 'pink', label: 'Pink' }
  ];

  // Example 2: Sizes Multi-Select
  const [selectedSizes, setSelectedSizes] = useState([]);
  
  const sizeOptions = [
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ];

  // Example 3: Grouped Options (Categories)
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categoryOptions = [
    {
      label: 'Electronics',
      options: [
        { value: 'phones', label: 'Phones' },
        { value: 'laptops', label: 'Laptops' },
        { value: 'tablets', label: 'Tablets' }
      ]
    },
    {
      label: 'Clothing',
      options: [
        { value: 'shirts', label: 'Shirts' },
        { value: 'pants', label: 'Pants' },
        { value: 'shoes', label: 'Shoes' }
      ]
    }
  ];

  // Example 4: Searchable Single Select (Brand)
  const [selectedBrand, setSelectedBrand] = useState(null);
  
  const brandOptions = [
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'puma', label: 'Puma' },
    { value: 'reebok', label: 'Reebok' },
    { value: 'underarmour', label: 'Under Armour' }
  ];

  const handleSubmit = () => {
    const productData = {
      colors: selectedColors.map(c => c.value),
      sizes: selectedSizes.map(s => s.value),
      category: selectedCategory?.value,
      brand: selectedBrand?.value
    };
    
    console.log('Product Data:', productData);
    alert('Check console for product data!');
  };

  // Custom styles example
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: '45px',
      borderColor: '#e2e8f0',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#dbeafe',
      borderRadius: '6px'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#1e40af',
      fontWeight: '500'
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#1e40af',
      ':hover': {
        backgroundColor: '#3b82f6',
        color: 'white',
      }
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          React Select Examples for E-commerce Admin
        </h1>

        <div className="space-y-6 bg-white rounded-lg shadow-lg p-6">
          
          {/* Example 1: Multi-Select Colors */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              1. Available Colors (Multi-Select)
            </label>
            <Select
              isMulti
              options={colorOptions}
              value={selectedColors}
              onChange={setSelectedColors}
              placeholder="Select colors..."
              closeMenuOnSelect={false}
              styles={customStyles}
              className="text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selectedColors.map(c => c.value).join(', ') || 'None'}
            </p>
          </div>

          {/* Example 2: Multi-Select Sizes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              2. Available Sizes (Multi-Select)
            </label>
            <Select
              isMulti
              options={sizeOptions}
              value={selectedSizes}
              onChange={setSelectedSizes}
              placeholder="Select sizes..."
              closeMenuOnSelect={false}
              styles={customStyles}
              className="text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selectedSizes.map(s => s.value).join(', ') || 'None'}
            </p>
          </div>

          {/* Example 3: Grouped Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              3. Category (Grouped Options)
            </label>
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Select category..."
              className="text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selectedCategory?.value || 'None'}
            </p>
          </div>

          {/* Example 4: Searchable Single Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              4. Brand (Searchable)
            </label>
            <Select
              options={brandOptions}
              value={selectedBrand}
              onChange={setSelectedBrand}
              placeholder="Search or select brand..."
              isSearchable
              isClearable
              className="text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selectedBrand?.value || 'None'}
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium mt-4"
          >
            Save Product
          </button>
        </div>

        {/* Feature Showcase */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Key Features Demonstrated
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Multi-Select:</strong> Colors and sizes allow multiple selections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Searchable:</strong> Type to filter options (try it in Brand)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Grouped Options:</strong> Category shows organized groups</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Clearable:</strong> Brand has an X button to clear selection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Custom Styling:</strong> Colors/sizes use custom blue theme</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span><strong>Keep Menu Open:</strong> Multi-selects stay open for multiple picks</span>
            </li>
          </ul>
        </div>

        {/* Code Example */}
        <div className="mt-8 bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto">
          <h3 className="text-lg font-bold mb-3 text-white">Basic Code:</h3>
          <pre className="text-sm">
{`import Select from 'react-select';

const [selectedColors, setSelectedColors] = useState([]);

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  // ... more options
];

<Select
  isMulti
  options={colorOptions}
  value={selectedColors}
  onChange={setSelectedColors}
  placeholder="Select colors..."
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}