// dialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
//   DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/core/dialog';
import { PlusIcon, Github, ExternalLink } from 'lucide-react';

// Import your images here
import IMG0 from '../assets/bhoomi.png';
import IMG1 from '../assets/portfolio1.jpg';
import IMG2 from '../assets/bitWebsite.png';
import IMG3 from '../assets/wallet.png';
import IMG4 from '../assets/university.png';
import IMG5 from '../assets/ekam.png';
import IMG6 from '../assets/portfolio6.png';
import IMG7 from '../assets/weather.png';
import IMG8 from '../assets/memoir.png';
import IMG9 from '../assets/vetrans.png';

interface ProjectData {
    id: number;
    image: string;
    title: string;
    github: string;
    demo: string;
    description: string;
}

const data = [
  {
    id: 8,
    image: IMG8,
    title: "BitMemoir",
    github: 'https://github.com/samuelEvans000/BitMemoirFrontendV2',
    demo: 'https://www.bitmemoir.com/en',
    description: "BitMemoir is a unique blockchain-based platform focusing primarily on negating the possibility of creating fake credentials or fudging the documents. The aim is to develop and nurture an ecosystem of verified documents and journey mapping an individual’s life."
  },
  {
    id: 0,
    image: IMG0,
    title: "BitBhoomi",
    github: 'https://github.com/NavrajBIT/NFTreeClient',
    demo: 'https://bitbhoomi.com/',
    description: "This is an blockchain website, where users can buy types of trees and plants using crypto currency."
  },
  {
    id: 9,
    image: IMG9,
    title: "Veterans Connect",
    github: 'https://github.com/samuelEvans000/VeteransConnectApp',
    demo: '',
    description: "This is an APplication for Uniting Veterans. Empowering Lives."
  },
  {
    id: 1,
    image: IMG1,
    title: "Wildlife Conservation",
    github: 'https://github.com/Kusalava0/Wildlife-Conservation',
    demo: 'https://drive.google.com/file/d/1S8TOoh9hTh7WAUCdIvk-cJzlFV27jHjn/view?usp=sharing',
    description: "A 36-hour Hackathon winning project for detecting endangered species and sending real-time alerts to prevent poaching."
  },
  {
    id: 2,
    image: IMG2,
    title: "Bit website",
    github: 'https://github.com/samuelEvans000/bit-new',
    demo: 'https://www.beimagine.tech/',
    description: "This is an static website for beyond imagination technologies with good animation and design, which have a form that send email on submit."
  },
  {
    id: 3,
    image: IMG3,
    title: "Bit-wallet",
    github: 'https://github.com/samuelEvans000/bit-wallet',
    demo: 'https://www.thebitwallet.com/',
    description: "This is an static wallet website for beyond imagination technologies with good animation and design which lets you download the wallet."
  },
  {
    id: 4,
    image: IMG4,
    title: "university website",
    github: 'https://github.com/samuelEvans000/ug-new',
    demo: 'https://iucila.ar/',
    description: "This is an spanish university website which display's the course and programs of the university, it's a static website with good animations and unique color palette."
  },
  {
    id: 5,
    image: IMG6,
    title: "Facial Recognition Attendance",
    github: 'https://github.com/Kusalava0/Attendance_Prjct',
    demo: '',
    description: "An attendance system using facial recognition technology."
  },
  {
    id: 6,
    image: IMG5,
    title: "ekamGreen ventures",
    github: 'https://github.com/samuelEvans000/ekamGreen',
    demo: 'https://www.ekamgreenventures.com/',
    description: "This is an static website for Ekam green ventures which describes about their product quality and connections, it has good design and multiple forms."
  },
  {
    id: 7,
    image: IMG7,
    title: "Weather dashboard",
    github: 'https://github.com/samuelEvans000/weather-dashboard',
    demo: 'https://weather-dashboard-olive-gamma.vercel.app/',
    description: "This website display weather details of the city which user wants to know, by fetching the weather API the globe is created with three js."
  }
];

export function ProjectGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((project) => (
        <ProjectDialog key={project.id} project={project} />
      ))}
    </div>
  );
}

interface ProjectDialogProps {
    project: ProjectData;
}

function ProjectDialog({ project }: ProjectDialogProps) {
  return (
    <Dialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border-2 border-zinc-950/10 bg-black border-gray-800 text-white shadow-lg shadow-gray-900 dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        <DialogImage
          src={project.image}
          alt={project.title}
          className='h-48 w-full object-full'
        />
        <div className='flex flex-grow flex-row items-end justify-between p-2'>
          <div>
            <DialogTitle className='dark:text-zinc-50'>
              {project.title}
            </DialogTitle>
          </div>
          <button
            type='button'
            className='relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500'
            aria-label='Open dialog'
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: '24px',
          }}
          className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-black dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]'
        >
          <DialogImage
            src={project.image}
            alt={project.title}
            className='h-64 w-full object-cover'
          />
          <div className='p-6'>
            <DialogTitle className='text-2xl text-white dark:text-zinc-50'>
              {project.title}
            </DialogTitle>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className='mt-2 text-zinc-500 dark:text-zinc-500'>
                {project.description}
              </p>
              <div className='mt-4 flex space-x-4'>
                <a
                  className='inline-flex items-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  href={project.github}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Github size={20} className="mr-2" />
                  GitHub
                </a>
                {project.demo && (
                  <a
                    className='inline-flex items-center text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                    href={project.demo}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <ExternalLink size={20} className="mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </DialogDescription>
          </div>
          <DialogClose className='text-zinc-50' />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}