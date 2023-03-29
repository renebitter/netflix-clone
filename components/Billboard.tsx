import useBillboard from '@/hooks/useBillboard';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Billboard: React.FC = () => {
  const { data } = useBillboard();

  //h-[56.25vw] = 16:9 aspect ratio
  return (
    <div className='relative h-[56.25vw]'>
      <video
        className='
        w-full
        h-[56.25vw]
        object-cover
        brightness-[60%]
      '
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
        autoPlay
        muted
        loop></video>
      <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
        <p className='text-white text-1xl md:text-5xl h-full w-full lg:text-6xl font-bold drop-shadow-xl'>
          {data?.title}
        </p>
        <p className='text-white text-[8px] md:text-lg mt-3 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
          {data?.description}
        </p>
        <div>
          <button
            className='
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            '>
            <AiOutlineInfoCircle className='w-4 md:w-7 mr-1' />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
