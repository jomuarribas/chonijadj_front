"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Image from "next/image";
import styles from "./page.module.css";
import { useApi } from './hooks/useApi';
import Loader from './components/Loader/Loader';

export default function Home() {
  const [fileName, setFileName] = useState('Hacer foto');
  const { apiFetch, loading } = useApi();

  useEffect(() => {
    const newSocket = io('https://chonijapp.up.railway.app');

    newSocket.on('welcome', (welcomeMessage) => {
      console.log(welcomeMessage);
    });

    return () => newSocket.close();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : 'Hacer foto');
  };

  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('artist', e.target.artist.value);
    formData.append('title', e.target.title.value);
    formData.append('dedicatedBy', e.target.dedicatedBy.value);
    formData.append('dedicatedImg', e.target.dedicatedImg.files[0]);
    const route = 'songs/register';
    try {
      const data = await apiFetch(true, 'POST', route, formData, null, 'multipart/form-data');
      if (data.message) {
        e.target.reset();
        setFileName('Haz la foto');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.body}>
      if (loading) {
        <Loader />
      }
      <header className={styles.header}>
        <Image
          src="/Chonijapp.webp"
          alt="Logotipo"
          width={320}
          height={140}
        />
      </header>
      <main className={styles.form}>
        <div>
          <form onSubmit={sendForm}>
            <h3>Solo si la vas a gozar...</h3>
            <input type="text" name='artist' placeholder="¿De quien es la canción?" required />
            <input type="text" name='title' placeholder="¿Como se llama el temazo?" required />
            <input type="text" name='dedicatedBy' placeholder="Tu nombre/mote o nombre de grupo" required />
            <p>Este temazo se merece tu mejor pose...
              <input type="file" name="dedicatedImg" id="dedicatedImg" className={styles.inputfile} onChange={handleFileChange} />
              <label htmlFor="dedicatedImg">{fileName}</label>
            </p>
            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>created by ©jomuarribas</p>
      </footer>
    </div>
  );
}