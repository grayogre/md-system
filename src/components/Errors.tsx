export default function Errors(props: {
  messages: string[],
  className: string
}) {
  return (
    <div className={props.className}>
      {props.messages?.map((msg, index) => (
        <p className="text-red-500 mb-2 px-2" key={index}>{msg}</p>
      ))}
    </div>
  )
}