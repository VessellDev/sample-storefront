import VessellSDK from '@vessell/sdk'

export default VessellSDK({
  projectCode: process.env.NEXT_PUBLIC_VESSELL_PROJECT_CODE,
  firebaseAuthTenantId: process.env.NEXT_PUBLIC_VESSELL_FIREBASE_AUTH_TENANT_ID,
})
