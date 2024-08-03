"use client";
import Link from 'next/link';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <Image
          src="/ChonijaDJ_Logo.webp"
          alt="Logotipo"
          width={320}
          height={140}
        />
        <p>
          w w w . c h o n i j a . c o m
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.links}>
          <div>
            <p>INSTAGRAM</p>
            <a href="https://instagram.com/chonija_dj" target="_blank" rel="noopener noreferrer">
              <Image
                src="/instagram.svg"
                alt="Logotipo"
                width={100}
                height={100}
              />
            </a>
          </div>
          <div>
            <p>TIK-TOK</p>
            <a href="https://www.tiktok.com/@chonija_dj" target="_blank" rel="noopener noreferrer">
              <Image
                src="/tiktok.svg"
                alt="Logotipo"
                width={100}
                height={100}
              />
            </a>
          </div>
          <div>
            <p>CHONIJAPP</p>
            <Link href='/chonijapp'>
              <Image
                src="/Chonijapp_Titulo.webp"
                alt="Logotipo"
                width={510}
                height={80}
              />
            </Link>
          </div>
        </div>
        <div className={styles.image}>
          <Image
            src="/ChonijaDJ_Silueta.webp"
            alt="Logotipo"
            width={600}
            height={180}
          />
        </div>
        <div className={styles.chonijacontact}>
          <p>Contacto:</p>
          <a href="mailto:info@chonija.com" passHref>
            info@chonija.com
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>created by ©jomuarribas</p>
      </footer>
    </div>
  );
}