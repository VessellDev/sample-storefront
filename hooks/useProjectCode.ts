import { useRouter } from "next/router"

export const useProjectCode = () => {
  const {
    query: { projectCode },
  } = useRouter()

  const getLinkWithQuery = (path: string) =>
    `${path}${projectCode ? `?projectCode=${projectCode}` : ""}`

  return { getLinkWithQuery }
}
