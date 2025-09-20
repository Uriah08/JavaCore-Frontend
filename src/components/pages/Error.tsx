import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-extralight'>404 ERROR</h1>
        <h1>This page doesn't exist.</h1>
        <Link to={'/'}>
            <Button variant={'outline'} className='mt-3 cursor-pointer'>Go Back</Button>
        </Link>
    </div>
  )
}

export default Error