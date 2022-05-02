function UserImage() {
  const randomUser = Math.floor(Math.random() * 101);
  const imageUrl = `https://randomuser.me/api/portraits/thumb/${randomUser % 2 === 0 ? 'women' : 'men'}/${randomUser}.jpg`

  return (
    <div className="flex-shrink-0 w-10 h-10">
      <img className="w-full h-full rounded-full"
        src={imageUrl}
        alt="user" />
    </div>
  )
}

export default UserImage;