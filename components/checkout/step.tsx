import { CheckCircle } from '@mui/icons-material'
import { Box, Card, CardProps, Collapse, Typography } from '@mui/material'
import { FC, useCallback } from 'react'

export interface StepFormProps {
  onSuccess: () => void
  onGoBack: () => void
}

export interface StepResumeProps {
  onClick: () => void
}

type StepProps = CardProps & {
  index: number
  title: string
  currentIndex: number
  Form: FC<StepFormProps>
  Resume: FC<StepResumeProps>
  setCurrentIndex: (index: number) => void
}

const Step: FC<StepProps> = ({
  index,
  title,
  currentIndex,
  setCurrentIndex,
  Form,
  Resume,
  ...props
}) => {
  const handleMoveForward = useCallback(() => {
    setCurrentIndex(index + 1)
  }, [index])

  const handleMoveBack = useCallback(() => {
    setCurrentIndex(index)
  }, [index])

  return (
    <Card {...props}>
      <Box px={3} py={2} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h3"
            color={index > currentIndex ? 'secondary' : 'textPrimary'}
          >
            {index}. {title}
          </Typography>
          {currentIndex > index && <CheckCircle color="success" />}
        </Box>
        <Collapse in={currentIndex >= index} unmountOnExit>
          {currentIndex <= index && (
            <Form onSuccess={handleMoveForward} onGoBack={handleMoveBack} />
          )}
          {currentIndex > index && <Resume onClick={handleMoveBack} />}
        </Collapse>
      </Box>
    </Card>
  )
}

export default Step
