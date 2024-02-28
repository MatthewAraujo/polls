import { Votes } from "./Votes";
import { Input } from "./ui/input";

export interface PollProps {
  title: string;
  options: {
    id: string;
    title: string;
    votes: number;
  }[];
}


export function Poll({title, options}: PollProps){

  return (
    <div>
      <h2>{title}</h2>
      {options.map((option) => (
        <div key={option.id} className='flex gap-2 items-center w-fit relative'>
          <Input
            type="text"
            id={option.id}
            name="pollOption"
            value={option.title}
            readOnly
            className='  text-black font-bold py-2 px-4 w-fit rounded cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
          />
          <Votes options={options} />
        </div>
      ))}
    </div>
  )
}