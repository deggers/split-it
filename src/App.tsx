import React, { useState, useEffect } from 'react';
import './tailwind.css';
import Header from './Header';
import Login from './Login';
import Modal from './Modal';
import Card from './Card';
import InputCard from './InputCard';
import { db } from './firebaseConfig';
import { collection, addDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import Cookies from 'js-cookie';

interface Item {
  id?: string;
  description: string;
  price: string;
}

const App: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(() => Cookies.get('loggedIn') === 'true');
  const [username, setUsername] = useState<string>(() => Cookies.get('username') || '');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsList: Item[] = [];
      snapshot.forEach((doc) => {
        itemsList.push({ ...doc.data(), id: doc.id } as Item);
      });
      setItems(itemsList);
    });

    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    if (description && price) {
      const newItem: Item = { description, price };
      await addDoc(collection(db, "items"), newItem);
      setDescription('');
      setPrice('');
    } else {
      alert('Description and Price cannot be empty');
    }
  };

  const handleLogin = (username: string) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    Cookies.remove('loggedIn');
    Cookies.remove('username');
    setLoggedIn(false);
    setUsername('');
  };

  const openModal = (item: Item, index: number) => {
    setCurrentItem(item);
    setCurrentItemIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setCurrentItemIndex(null);
  };

  const saveItem = async (updatedItem: Item) => {
    if (currentItemIndex !== null && currentItem?.id) {
      const itemRef = doc(db, "items", currentItem.id);
      await updateDoc(itemRef, {
        description: updatedItem.description,
        price: updatedItem.price
      });
      const updatedItems = [...items];
      updatedItems[currentItemIndex] = updatedItem;
      setItems(updatedItems);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && description && price) {
      addItem();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {loggedIn ? (
        <>
          <Header username={username} onLogout={handleLogout} />
          <div className="pt-16 max-w-2xl mx-auto p-4">
            <InputCard
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              addItem={addItem}
              handleKeyDown={handleKeyDown}
            />
            <div>
              {items.map((item, index) => (
                <Card key={item.id} item={item} onEdit={() => openModal(item, index)} />
              ))}
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            item={currentItem}
            onSave={saveItem}
          />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;