export default function Message({ children, avatar, username, description }) {
  return (
    <div className="container bg-primary-green p-8 border-b-2 rounded-lg items-center shadow-md">
      <div className="flex ">
        <img src={avatar} className="w-9 rounded-full" />
        <h2 className="text-xl font-medium px-2">{username}</h2>
      </div>
      <div className="py-4">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
