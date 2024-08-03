
const Content = ({ tweet }) => {

  return (
    <div className="mt-6 flex flex-col gap-5 w-full">
      {
        tweet?.textContent && <p>{tweet?.textContent}</p>
      }
      {
        tweet?.imageContent && <img className="my-2 w-full rounded-lg object-cover max-h-[300px] " src={tweet?.imageContent} alt="img" />
      }
    </div>
  );
};

export default Content;