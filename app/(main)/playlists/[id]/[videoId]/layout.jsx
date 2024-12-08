function Layout({ children, note, player, videos }) {
  return (
    <>
      <div className="  container py-10 space-y-5">
        {/* player part */}
        <div className="">
          <div className="flex flex-col lg:flex-row justify-between lg:space-x-6">
            {player}
            {videos}
          </div>
        </div>
        {/* note part */}
        <div className="">{note}</div>
      </div>
    </>
  );
}

export default Layout;
