"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import io from 'socket.io-client';
import Login from "../components/Login/Login";

export default function Home() {
  const [songsList, setSongsList] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { apiFetch, loading } = useApi();

  const handleSongsList = async () => {
    const route = 'songs';
    try {
      const data = await apiFetch(false, 'GET', route);
      setSongsList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let password = localStorage.getItem('password');
    if (password !== process.env.NEXT_PUBLIC_LOGIN) {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }, []);

  useEffect(() => {
    handleSongsList();
  }, []);

  useEffect(() => {
    const newSocket = io('https://chonijapp.up.railway.app');

    newSocket.on('welcome', (welcomeMessage) => {
      console.log(welcomeMessage);
    });

    newSocket.on('newSong', (songData) => {
      setSongsList((prevSongsList) => [...prevSongsList, songData.song]);
      console.log('Nueva canción añadida:', songData.song);
    });

    return () => newSocket.close();
  }, []);

  if (!songsList) {
    return <p>Cargando...</p>;
  }

  const handleToggle = () => {
    setIsToggled(!isToggled); // Cambia el estado de encendido/apagado
  };

  return (
    <>
      {!isLogin ? (
        <Login />
      ) : (
        <>
          <header className={styles.header}>
            <Image
              src="/Chonijapp.webp"
              alt="Logotipo"
              width={350}
              height={153}
            />
            <div>
              <h2>CHONIAREA</h2>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isToggled}
                  onChange={handleToggle}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </header>

          <main className={styles.songsList}>
            {songsList.filter(song => song.status === 'pending').map((song) => (
              <div className={styles.songCard} key={song._id}>
                <div>
                  <h3>{song.title}</h3>
                  <strong>{song.artist}</strong>
                  <p>Dedicado por: {song.dedicatedBy}</p>
                </div>
                <div>
                  <Image
                    src={song.dedicatedImg}
                    alt={`Imagen de ${song.title}`}
                    width={222}
                    height={125}
                  />
                </div>
                <div className={styles.buttons}>
                  <button onClick={
                    async (e) => {
                      e.preventDefault();
                      const route = `songs/viewsong/${song._id}`;
                      try {
                        await apiFetch(true, 'PUT', route);
                        handleSongsList();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >Enviar</button>
                  <button onClick={
                    async (e) => {
                      e.preventDefault();
                      const route = `songs/delete/${song._id}`;
                      try {
                        await apiFetch(true, 'DELETE', route);
                        handleSongsList();
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }>Rechazar</button>
                </div>
              </div>
            ))}
          </main>
        </>
      )}
    </>
  );
}