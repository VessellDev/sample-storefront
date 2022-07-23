import VessellSDK from '@vessell/sdk'

export default VessellSDK({
  projectCode: process.env.VESSELL_PROJECT_CODE as string
})
