import LiveSession from "@/components/LiveSession";

const TestVideo = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-serif mb-4">
        Jitsi Video Test
      </h1>

      <LiveSession roomUrl="https://meet.jit.si/talkshore-test-room" />
    </div>
  );
};

export default TestVideo;