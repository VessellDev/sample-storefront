import { Box, Typography } from '@mui/material'
import { NextPage } from 'next'

const ProjectNotFound: NextPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100wh',
        height: '100vh',
      }}
    >
      <Typography variant="h2">Projeto não encontrado</Typography>
      <Typography variant="body1">
        Certifique-se de informar um código de projeto existente na URL
      </Typography>
    </Box>
  )
}

export default ProjectNotFound
