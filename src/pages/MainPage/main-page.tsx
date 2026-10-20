import { Chat } from '@/features/chat/ui'
import { Sidebar } from '@/features/sidebar/ui/sidebar'
import styles from './main-page.module.scss'

export const MainPage = () => (
<div className={styles.layout}>
    <Sidebar />
    <Chat />
</div>
)
