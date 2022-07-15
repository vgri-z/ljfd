import useList from '../hooks/useList'
export default function () {
  const { _getRoleList, searchOption } = useList()

  const search = () => {
    console.log(searchOption)
    searchOption.Filter = 'A'
    _getRoleList()
  }

  const reset = () => {
    searchOption.Filter = ''
    _getRoleList()
  }

  return { search, reset }
}
