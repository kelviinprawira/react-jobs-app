/* eslint-disable react/prop-types */

const Card = ({children, bg = 'bg-gray-100'}) => {
  return (
    <div className={`${bg} p-6 bg-gray-100 rounded-lg shadow-md`}>
      {children}
    </div>
  )
}

export default Card