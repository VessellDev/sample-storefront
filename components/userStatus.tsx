import { AccountCircleOutlined } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useAuth } from 'hooks/useAuth'
import { usePurchase } from 'hooks/usePurchase'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import SDK from 'sdk'

const UserStatus: FC = () => {
  const { isLogged } = useAuth()
  const { removePurchaseId } = usePurchase()
  const queryClient = useQueryClient()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    removePurchaseId()
    await SDK.auth.signOut()
    queryClient.invalidateQueries(['purchase'])
  }

  return (
    <>
      <IconButton color="primary" onClick={handleClick}>
        <AccountCircleOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {isLogged ? (
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        ) : (
          <>
            <Link href="/login" passHref>
              <MenuItem component="a">Entrar</MenuItem>
            </Link>
            <Link href="/signup" passHref>
              <MenuItem component="a">Criar Conta</MenuItem>
            </Link>
          </>
        )}
      </Menu>
    </>
  )
}

export default UserStatus
