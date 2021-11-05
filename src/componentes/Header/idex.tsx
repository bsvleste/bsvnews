import { useRouter } from 'next/router';
import Link from 'next/link'; 
import { SingInButton } from '../SingInButton';
import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header (){
  
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>BSVNEWS</h1>
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Post</a>
          </ActiveLink>
        </nav>
        <SingInButton/>
      </div>
    </header>
  );
}