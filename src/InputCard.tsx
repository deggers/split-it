import React from 'react';

interface InputCardProps {
  description: string;
  setDescription: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  addItem: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputCard: React.FC<InputCardProps> = ({
  description,
  setDescription,
  price,
  setPrice,
  addItem,
  handleKeyDown
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded shadow mb-4">
      <div className="flex flex-col">
        <input
          className="border p-2 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="border p-2 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addItem}>
          Add
        </button>
      </div>
    </div>
  );
};

export default InputCard;