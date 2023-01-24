declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VESSELL_PROJECT_CODE: string
      NEXT_PUBLIC_VESSELL_FIREBASE_AUTH_TENANT_ID: string
    }
  }
}

export {}
