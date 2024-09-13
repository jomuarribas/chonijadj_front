"use client";
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from "next/image";
import styles from "./page.module.css";
import { useApi } from '../hooks/useApi';
import Loader from '../components/Loader/Loader';
import SearchModal from "../components/SearchModal/SearchModal";
import Link from 'next/link';

export default function Chonijapp() {
  const recaptcha = useRef(null);
  const [fileName, setFileName] = useState('Hacer foto');
  const [selectedSong, setSelectedSong] = useState(null);
  const { apiFetch, loading } = useApi();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const newSocket = io('https://chonijapp.up.railway.app');
    // const newSocket = io('http://localhost:8080');

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
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      return;
    }
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
        setSelectedSong(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setModalVisible(false);
  };

  return (
    <div className={styles.body}>
      {loading ? <Loader /> : null}
      <header className={styles.header}>
        <Image
          src="/Chonijapp.webp"
          alt="Logotipo"
          width={320}
          height={140}
        />
      </header>
      <main className={styles.form}>
        <SearchModal
          isVisible={isModalVisible}
          onClose={closeModal}
          onSongSelect={handleSongSelect}
        />
        <div>
          <form onSubmit={sendForm}>
            <h3>Solo si la vas a gozar...</h3>
            <input type='button' onClick={openModal} value='¡Busca tu canción!'></input>
            <p>Si no encuentras tu temazo, no te preocupes. Rellena los campos manualmente.</p>
            <input type="text" name='artist' placeholder="¿De quien es la canción?" value={selectedSong ? selectedSong.artist.name : ''} required />
            <input type="text" name='title' placeholder="¿Como se llama el temazo?" value={selectedSong ? selectedSong.title : ''} required />
            <input type="text" name='dedicatedBy' placeholder="Tu nombre/mote o nombre de grupo" required />
            <p>Este temazo se merece tu mejor pose...
              <input type="file" name="dedicatedImg" id="dedicatedImg" className={styles.inputfile} onChange={handleFileChange} required />
              <label htmlFor="dedicatedImg">{fileName}</label>
            </p>
            <p>La imagen se almacenará en una base de datos durante 24 horas. Posteriormente será eliminada.</p>
            <div>
              <input type='checkbox' name='checkboxConditions' id='checkboxConditions' required />
              <label htmlFor="checkboxConditions">Acepto que Chonija DJ se reserva el derecho a mostrar o no en directo el contenido enviado en este formulario.</label>
            </div>
            <ReCAPTCHA
              className={styles.reCaptcha}
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
              ref={recaptcha}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
        <Link href='/'>
          - Volver a home -
        </Link>
      </main>
      <footer className={styles.footer}>
        <p>created by ©jomuarribas</p>
      </footer>
    </div>
  );
}
