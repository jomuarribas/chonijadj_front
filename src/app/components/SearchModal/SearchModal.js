import { useState } from 'react';
import styles from './SearchModal.module.css';
import Image from 'next/image';

export default function SearchModal({ isVisible, onClose, onSongSelect }) {
  const [searchResults, setSearchResults] = useState([]);

  if (!isVisible) return null;

  const searchMusic = async (e) => {
    e.preventDefault();
    const query = e.target.search.value;

    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  return (
    <section className={styles.searchModal}>
      <span className="material-symbols-outlined" onClick={() => { onClose(); setSearchResults([]); }}>
        cancel
      </span>
      <form onSubmit={searchMusic}>
        <h2>¿En qué estás pensando?</h2>
        <input type="text" name="search" />
        <button type="submit">Buscar</button>
      </form>

      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((song) => (
              <li key={song.id} onClick={() => { onSongSelect(song); setSearchResults([]) }}>
                <Image
                  src={song.album.cover_medium}
                  alt="Logotipo"
                  width={100}
                  height={100}
                />
                <div>
                  <h3>{song.title}</h3>
                  <p>{song.artist.name}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Sin resultados</p>
        )}
      </div>
    </section>
  );
}
