import { motion } from 'framer-motion';
import timelineElements from "../assets/timeLineElements";
import schoolIcon from "../assets/school.svg";
import workIcon from "../assets/work.svg";
// import amikus from "../assets/amikus.svg";
import bit from "../assets/bit.png";
import { Cursor } from '@/components/core/cursorprops';

const MouseIcon = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={26}
      height={31}
      fill='none'
      className="hidden sm:block"
    >
      <g clipPath='url(#a)'>
        <path
          fill={color}
          fillRule='evenodd'
          stroke={'#fff'}
          strokeLinecap='square'
          strokeWidth={2}
          d='M21.993 14.425 2.549 2.935l4.444 23.108 4.653-10.002z'
          clipRule='evenodd'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill={color} d='M0 0h26v31H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

function Cursor2({ element }: any) {
  const cursorContent = element.logo ? (
    <div className="flex items-center">
      <img src={element.logo === "school" ? schoolIcon : (element.logo === "bit" ? bit : workIcon)} alt={element.title} className="w-8 h-8 sm:w-12 sm:h-12 p-1 sm:p-2 bg-white rounded-lg" />
      <p className="ml-2 text-xs sm:text-sm">{element.logo === "school" ? "Graduation" : (element.logo === "bit" ? "Beyond Imagination Technologies" : "Freelancer")}</p>
    </div>
  ) : (
    <div className={`rounded-[4px] bg-${element.color}-500 px-2 py-0.5 text-neutral-50 text-xs sm:text-sm`}>
      {element.title}
    </div>
  );

  return (
    <div className='w-full sm:w-auto'>
      <div className='overflow-hidden rounded-[12px] shadow-md dark:bg-black'>
        <Cursor
          attachToParent
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.3, opacity: 0 },
          }}
          transition={{
            ease: 'easeInOut',
            duration: 0.15,
          }}
          className='hidden sm:block left-12 top-4'
        >
          <div className="flex items-center">
            <MouseIcon color={`bg-${element.color}-500`} />
            <div className="ml-2">
              {cursorContent}
            </div>
          </div>
        </Cursor>
        <motion.div
          className="border border-gray-900 rounded-lg px-4 sm:px-8 py-4 bg-gray-800 w-full text-center z-10 sm:w-96"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-lg sm:text-xl font-medium">{element.title}</div>
          <div className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm">
            {element.location}
            <span className="block sm:inline sm:ml-2">| {element.date}</span>
          </div>
          <div className="mb-4 text-sm text-center">{element.description}</div>
          <div className="flex flex-wrap mb-4 sm:mb-6 justify-center">
            {element.tech.map((tech: string, index: number) => (
              <motion.span
                key={index}
                className="bg-gray-900 rounded-xl px-2 py-1 text-xs sm:text-sm m-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          <motion.img
            src={element.icon === "school" ? schoolIcon : workIcon}
            alt="icon"
            className={`bg-${element.color}-500 w-8 p-1 rounded-lg z-20 absolute -left-14 top-4 sm:hidden`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function Timeline({ defaultColor }: any) {
  return (
    <div className="container mx-auto px-4">
      {timelineElements.map((element, index) => {
        const colors = [
          "bg-red-500",
          "bg-blue-500",
          "bg-yellow-500",
          "bg-purple-500",
          "bg-orange-500",
        ];

        console.log(colors)

        const color = defaultColor || `bg-${element.color}-500`;

        return (         
          <motion.div
            key={element.id}
            className="flex flex-col sm:flex-row m-0 sm:m-4 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut"
            }}
          >
            <div className="hidden sm:flex items-start w-44 pt-0.5 relative">
              <div className="w-4/5 text-gray-500 text-sm">{element.date}</div>
              <div
                className={`${color} w-px h-full translate-x-5 translate-y-10 opacity-30`}
              ></div>
              <motion.img
                src={element.icon === "school" ? schoolIcon : workIcon}
                alt="icon"
                className={`${color} w-8 sm:w-10 p-1 rounded-lg z-20`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <div
                className={`${color} h-px w-8 translate-y-5 opacity-30`}
              ></div>
            </div>
            <Cursor2 element={element} />
            <div
              className={`${color} w-0.5 h-6 mx-auto my-2 opacity-60 sm:hidden`}
            ></div>
          </motion.div>
        );
      })}
    </div>
  );
}