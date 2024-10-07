import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const FilterSection = ({ title, categories, selectedCategory, onCategoryChange, priceRange, onPriceRangeChange }) => {
  if (categories) {
    return (
      <div className="mb-6">
        <h3 className="font-semibold mb-2">{title}</h3>
        {categories.map(category => (
          <div key={category} className="flex items-center mb-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategory === category}
              onCheckedChange={() => onCategoryChange(category)}
            />
            <label htmlFor={`category-${category}`} className="ml-2">{category}</label>
          </div>
        ))}
      </div>
    );
  }

  if (priceRange) {
    return (
      <div className="mb-6">
        <h3 className="font-semibold mb-2">{title}</h3>
        <div className="flex items-center mb-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
            className="w-20 mr-2"
          />
          <span>to</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            className="w-20 ml-2"
          />
        </div>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value)}
          className="mt-2"
        />
      </div>
    );
  }

  return null;
};

export default FilterSection;