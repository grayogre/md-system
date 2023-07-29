export default function InputNumber( props:{
  title:string,
  registerReturn:any
})
{
  return (
    <label className="block col-auto">
      <h6 className="label-primary">{props.title}</h6>
      <input type="number" className="input-number" {...props.registerReturn} />
    </label>
  )
}