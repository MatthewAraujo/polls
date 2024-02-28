import { Form } from "@/components/Form";

export default function Home() {  
  return (
    <>
      <div className='max-w-64 mx-auto'>
        <h1 className=''>Create your Poll</h1>

        <div className='flex flex-col gap-2 justify-center items-center'>
          <Form/>
        </div>

      </div>
    </>
  )
}
