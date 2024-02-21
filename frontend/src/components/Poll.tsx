import { Input } from "./ui/input";

interface PollProps {
  id: string;
  title: string;
  options: {
    id: string;
    title: string;
  }[]
}


export function Poll({id, title, options}: PollProps){
  return (
    <div>
      <h2>{title}</h2>
      {options.map((option) => (
        <div key={option.id} className='flex gap-2 items-center'>
          <Input
            type="text"
            id={option.id}
            name="pollOption"
            value={option.title}
            readOnly
            className=' text-black font-bold py-2 px-4 rounded cursor-pointer'
            onClick={() => console.log('clicked')}
          />
        </div>
      ))}
    </div>
  )
}