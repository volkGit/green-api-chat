import { AuthForm } from '@/widgets/AuthForm/ui/auth-form'
import styles from './auth-page.module.scss'

export const AuthPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в систему</h1>
        <AuthForm />
      </div>
    </div>
  )
}
