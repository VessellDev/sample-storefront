import { SDK as SDKType } from "@vessell/sdk/lib/types/sdk"
import { GetServerSideProps } from "next"
import SDK from "sdk"

export const getServerSidePropsWithSDK = <P>(handler: (SDK: SDKType) => GetServerSideProps<P>): GetServerSideProps<P> => {
  return async (context) => {
    const { projectCode } = context.query

    if (!projectCode) {
      return {
        redirect: {
          destination: '/project-not-found',
          permanent: false
        }
      }
    }

    SDK.setProjectCode(projectCode as string)

    return handler(SDK)(context)
  }
}
