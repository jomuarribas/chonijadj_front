"use client";
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Image from "next/image";

import styles from "./page.module.css";

export default function Choniview() {
  const [songView, setSongView] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');

    newSocket.on('welcome', (welcomeMessage) => {
      console.log(welcomeMessage);
    });
    newSocket.on('viewSong', (songData) => {
      setSongView(songData.song);

      const timer = setTimeout(() => {
        setSongView(null);
      }, 20000);
      return () => clearTimeout(timer);
    });

    return () => newSocket.close();
  }, []);

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <Image
          src="/ChonijaDJ.webp"
          alt="Logotipo"
          width={700}
          height={150}
        />
      </header>
      <main className={styles.songView}>
        {songView ? (
          <div className={styles.songCard}>
            <h3>Pedido por: {songView.dedicatedBy}</h3>
            <h2>{songView.title}</h2>
            <Image
              src={songView.dedicatedImg}
              alt="Logotipo"
              width={1920}
              height={1080}
            />
          </div>
        ) : (
          <div className={styles.vinil}>
            <Image
              src="/vinilo.webp"
              alt="Logotipo"
              width={600}
              height={600}
            />
          </div>
        )}
      </main>
    </div>
  )
}