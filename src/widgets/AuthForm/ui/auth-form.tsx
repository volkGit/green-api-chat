import { useActionState } from 'react'
import type { AuthData } from '@/entities/max/model/types'
import { Button } from '@/shared/ui/Button'
import { InputLabel } from '@/shared/ui/InputLabel'
import { useMainStore } from '@/entities/max/model/store'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '@/app/routes/paths'
import { LABEL_LOGIN, LABEL_PASSWORD, BUTTON_TEXT } from './constants'
import styles from './auth-form.module.scss'

export const AuthForm = () => {
  const initialState = {
    idInstance: '',
    apiTokenInstance: ''
  }
  const updateStore = useMainStore.getState().updateStore
  const navigate = useNavigate()
  const handleAuth = (prevState: AuthData, formData: FormData) => {
    const idInstance = formData.get('idInstance') as string
    const apiTokenInstance = formData.get('apiTokenInstance') as string
    updateStore({
      authData: {
        idInstance,
        apiTokenInstance
      }
    })

    navigate(ROUTE_PATHS.MAIN)

    return {
      ...prevState,
      idInstance,
      apiTokenInstance
    }
  }
  const [_, submitAction] = useActionState<AuthData, FormData>(handleAuth, initialState)

  return (
    <form
      action={submitAction}
      className={styles['form-wrapper']}>
      <InputLabel
        name='idInstance'
        label={LABEL_LOGIN}
      />
      <InputLabel
        name='apiTokenInstance'
        type='password'
        label={LABEL_PASSWORD}
      />
      <Button>
        {BUTTON_TEXT}
      </Button>
    </form>
  )
}
