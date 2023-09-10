interface VideoPlayerProps {
  fileUrl: string;
}

const VideoPlayer = ({ fileUrl }: VideoPlayerProps) => {
  return (
    <video className="rounded-md" autoPlay loop controls playsInline muted>
      <source src={fileUrl as string} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
