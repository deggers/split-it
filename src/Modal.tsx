import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  onSave: (updatedItem: Item) => void;
}

interface Item {
  description: string;
  price: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item, onSave }) => {
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setPrice(item.price);
    }
  }, [item]);

  const handleSave = () => {
    if (item) {
      onSave({ description, price });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold dark:text-white">Edit Item</h2>
        <div className="mb-4">
          <input
            className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white p-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;