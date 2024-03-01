"use client"
import { Votes } from "./Votes";
import { Input } from "./ui/input";

export interface PollProps {
  pollId: string;
  title: string;
  options: {
    id: string;
    title: string;
    votes: number;
  }[];
}


export function Poll({ title, options, pollId }: PollProps) {

  async function handleVote(id: string) {
    const data = { pollOptionId: id }
    const response = await fetch(`http://localhost:3333/polls/${pollId}/votes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.log(response)
      return
    }

  }
  return (
    <div>
      <h2>{title}</h2>
      {options.map((option) => (
        <div key={option.id} className='flex gap-2 items-center w-fit relative'>
          <Input
            type="text"
            id={option.id}
            name="pollOption"
            onClick={() => handleVote(option.id)}
            value={option.title}
            readOnly
            className='  text-black font-bold py-2 px-4 w-fit rounded cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
          />
          <Votes id={option.id} votes={option.votes} />
        </div>
      ))}
    </div>
  )
}
