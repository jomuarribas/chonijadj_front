import styles from './Login.module.css';

export default function Login() {

  const handlePassword = (e) => {
    const password = e.target.password.value;
    localStorage.setItem('password', password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>Indica tu password</h1>
        <form onSubmit={handlePassword}>
          <input type="password" id='password' name='password' />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}