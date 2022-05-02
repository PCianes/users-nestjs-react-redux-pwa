function UserImage({ url }) {
  return (
    <div className="flex-shrink-0">
      <img className="h-10 w-10 rounded-full" src={url} alt="user" />
    </div>
  )
}

export default UserImage;