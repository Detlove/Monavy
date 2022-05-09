import { SStar } from './SStar'

export const SC5Stars = (props) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        columnGap: '2px',
        color: '#ffd200',
        width: '85px',
        height: '16px'
      }}
      {...props}
    >
      <SStar />
      <SStar />
      <SStar />
      <SStar />
      <SStar />
    </div>
  )
}
