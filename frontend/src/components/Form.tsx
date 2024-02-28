"use client"
import { PlusCircleIcon, MinusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export function Form(){
  const router = useRouter()
  const [input, setInput] = useState(1)

  function handleAddInput() {
    setInput(input + 1)
  }

  function handleRemoveInput() {
    setInput(input - 1)
  }

  async function  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      options: Array.from(formData.getAll('options'))
    }

    console.log(JSON.stringify(data))
    const response = await fetch('http://localhost:3333/polls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const poll = await response.json()
    console.log(poll)

    router.push(`/polls/${poll.pollId}`)
  }

  return (
    <form action="" onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-2" >
            <div className='mb-5'>
              <Input type="text"
                name='title'
                className=" text-black font-bold py-2 px-4 rounded border-none text-lg"
                placeholder='Set your Poll Title'
              />
            </div>

            {
              Array.from({ length: input }).map((_, index) => (
                <div className='flex relative' key={index}>
                  <Input type="text"
                    placeholder='Option'
                    name='options'
                    className=' text-black font-bold py-2 px-4 rounded'
                  />
                  {index === input - 1 && (
                    <div className='absolute right-0 x-transform top-0'>
                      <button onClick={handleAddInput} className="  text-black font-bold py-2 px-4 rounded">
                        <PlusCircleIcon size={24} />
                      </button>

                      {
                        input > 1 && (
                          <button onClick={handleRemoveInput} className="  text-black font-bold py-2 px-4 rounded">
                            <MinusCircleIcon size={24} />
                          </button>
                        )
                      }
                    </div>
                  )}
                </div>
              ))
            }

            <Button type='submit'>Create Poll</Button>
          </form>
  )
}