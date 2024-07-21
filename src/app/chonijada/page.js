"use client";
import Image from "next/image";
import Loader from '../components/Loader/Loader';
import styles from './page.module.css';
import { useApi } from "../hooks/useApi";
import { useEffect, useState } from "react";

export default function Chonijada() {
  const { apiFetch, loading } = useApi();
  const [songs, setSongs] = useState();

  const dataFetch = async () => {
    const route = 'songs';
    try {
      const data = await apiFetch(false, 'GET', route);
      if (data) {
        setSongs(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dataFetch()
  }, []);

  return (
    <div className={styles.body}>
      {!songs ? <Loader /> : null}
      <header className={styles.header}>
        <Image
          src="/Chonijapp.webp"
          alt="Logotipo"
          width={320}
          height={140}
        />
      </header>
      <main className={styles.main}>
        {songs && songs.filter(song => song.dedicatedImg !== 'https://res.cloudinary.com/dk0mmf7hv/image/upload/v1721240698/chonijaDJ/Noimg_zlbl8a.webp').map((song) => (
          <div key={song.id} className={styles.songCard}>
            <a href={song.dedicatedImg} target="_blank" rel="noopener noreferrer">
              <Image
                src={song.dedicatedImg}
                alt="Dedicado por:"
                layout="responsive"
                width={1920}
                height={1080}
              />
            </a>
            <h2>{song.title}</h2>
            <p><strong>Pedida por: </strong>{song.dedicatedBy}</p>
          </div>
        ))}

      </main>
      <footer className={styles.footer}>
        <p>created by ©jomuarribas</p>
      </footer>
    </div>
  )
}