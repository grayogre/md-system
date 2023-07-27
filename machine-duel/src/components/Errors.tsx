export default function Errors(props: {
  messages: string[]
}) {
  return (
    <div className="block">
      {props.messages?.map((msg, index) => (
        <p className="text-red-500 mb-2 px-2" key={index}>{msg}</p>
      ))}
    </div>
  )
}