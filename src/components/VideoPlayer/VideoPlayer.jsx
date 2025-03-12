export default function VideoPlayer({ videoUrl }) {
    const getEmbedUrl = (url) => {
      if (!url.includes("youtube.com/watch?v=")) return url;
      return url.replace("watch?v=", "embed/");
    };
  
    return (
      <div className="w-full flex justify-center my-4">
        <iframe
          className="w-full h-[360px] rounded-lg shadow-lg"
          src={getEmbedUrl(videoUrl)}
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  