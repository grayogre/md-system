export default function InputCheckBox( props:{
  title:string,
  registerReturn:any
})
{
  return (
    <label className="col-auto -mb-4">
      <input type="checkbox" {...props.registerReturn} />
      {props.title}
    </label>
  )
}