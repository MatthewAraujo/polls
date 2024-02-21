import { useState } from 'react'

import './App.css'
import { Input } from './components/ui/input'
import { PlusCircleIcon, MinusCircleIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import { api } from './lib/axios'
import { Poll } from './components/Poll'

function App() {
  const [input, setInput] = useState(1)
  const [data, setData] = useState('')

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

    const response = await api.post('polls', data)
    const poll = response.data
    console.log(poll.pollId)
    getData(poll.pollId)
  }

  async function getData(pollId: string) {
    const response = await api.get(`polls/${pollId}`)
    const data = response.data.poll
    setData(data)

  }

  // getData()
  return (
    <>
      <div className='max-w-64 mx-auto'>
        <h1 className=''>Create your Poll</h1>

        <div className='flex flex-col gap-2'>
          <form action="" onSubmit={handleSubmit}>
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

            <Button type='submit' onClick={getData}>Create Poll</Button>
          </form>
        </div>

        <div className='mt-52'>
          {
            data && <Poll id={data.id} title={data.title} options={data.options} />
          }
        </div>
      </div>
    </>
  )
}


export default App
