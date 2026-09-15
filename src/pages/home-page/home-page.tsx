import styles from './home-page.module.css'
import englishImg from '../../assets/img/english.jpg'

const HomePage = () => {
  return (
    <div className={styles.home}>
      <img
        className={styles.image}
        src={englishImg}
        alt="English"
      />
      <h1>CardTalk</h1>
      <p>Приложение для изучения иностранных слов. Карточки, авторитеты, приоритеты.</p>
    </div>
  )
}

export default HomePage