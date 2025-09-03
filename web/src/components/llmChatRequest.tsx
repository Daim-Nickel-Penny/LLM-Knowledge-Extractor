export default function LlmChatRequest({ msg }: { msg: string }) {
  return (
    <div className="ml-auto text-xs text-white bg-gray-700/20 p-4 rounded-2xl w-1/2">
      {msg}
    </div>
  );
}
