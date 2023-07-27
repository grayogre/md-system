export default function FixFieldFull(props:{title:string, value:any , className:string}) 
{
  return (
  <div className="col-span-full text-start">
    <h6 className="text-xs font-bold">{props.title}</h6>
    <p className={props.className}>{props.value}</p>
    <hr className="border-gray-500"/>
  </div>
  )
}