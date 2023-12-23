import HomeNav from "../../components/HomeNav";



const Newsfeed = () => {
    return (
      <div>
        <HomeNav />
        <div className="container mx-auto  ">
          <div className="flex justify-between">
            <div className="post">
              <h2>post</h2>
            </div>
            <div className="user">
              <h2>user</h2>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Newsfeed;