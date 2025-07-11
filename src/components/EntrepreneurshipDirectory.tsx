import React, { useState } from 'react';
import { EntrepreneurshipCard } from './EntrepreneurshipCard';
import { SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
// Importa los datos del archivo JSON
import entrepreneurshipsData from '../utils/entrepreneurships.json';

export function EntrepreneurshipDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Usa entrepreneurshipsData en lugar de entrepreneurships
  const categories = ['All', ...new Set(entrepreneurshipsData.map((item) => item.category))];

  const filteredEntrepreneurships = entrepreneurshipsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === '' || selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      id="emprendimientos"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar emprendimientos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="">Todas las categorías</option>
            {categories.map(
              (category, index) =>
                category !== 'All' && (
                  <option key={index} value={category}>
                    {category}
                  </option>
                )
            )}
          </select>
        </div>
      </div>

      {filteredEntrepreneurships.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No se encontraron resultados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntrepreneurships.map((item) => (
            <EntrepreneurshipCard key={item.id} entrepreneurship={item} />
          ))}
        </div>
      )}
    </motion.div>
  );
}