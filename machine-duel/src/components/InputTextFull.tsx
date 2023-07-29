export default function InputTextFull( props:{
    title:string,
    registerReturn:any
  })
{
  return (
    <label className="col-span-full text-start">
      <h6 className="label-primary">{props.title}</h6>
      <input type="text" className="input-primary text-start" {...props.registerReturn} />
    </label>
  )
}