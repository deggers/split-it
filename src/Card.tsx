import React from 'react';

interface Item {
  description: string;
  price: string;
}

interface CardProps {
  item: Item;
  onEdit: () => void;
}

const Card: React.FC<CardProps> = ({ item, onEdit }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-bold">{item.description}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">${item.price}</div>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;