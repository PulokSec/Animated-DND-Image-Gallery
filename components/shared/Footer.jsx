import React from 'react'

export default function Footer() {
  return (
    <div className=''>
			<footer>
				<div className='bg-white border-t-2  relative top-100 w-full h-48 flex flex-col justify-between '>
					<div className='container mx-auto pb-5 px-5 flex justify-center items-center flex-col mt-5'>
						<span className='flex sm:mt-0 mb-10 justify-center sm:justify-start gap-3'>
							<a
								href='https://www.facebook.com/pulok.chowdhury.priyo/'
								className='text-blue-600 transition duration-500 ease-in-out hover:text-white hover:bg-brand-1 rounded-full p-2'
							>
								<svg
									fill='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									className='w-5 h-5'
									viewBox='0 0 24 24'
								>
									<path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
								</svg>
							</a>
							<a
								href='https://github.com/PulokSec'
								className='ml-3 text-blue-400 transition duration-500 ease-in-out hover:text-white hover:bg-brand-1 rounded-full p-2'
							>
								<svg
									fill='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									className='w-8 h-8 '
									viewBox='0 0 24 24'
								>
									 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
								</svg>
							</a>
							<a
								href='https://www.instagram.com/pulok.chowdhury.priyo/'
								className='ml-3 text-red-600 transition duration-500 ease-in-out hover:text-white hover:bg-brand-1 rounded-full p-2'
							>
								<svg
									fill='none'
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									className='w-5 h-5 '
									viewBox='0 0 24 24'
								>
									<rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
									<path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01'></path>
								</svg>
							</a>
							<a
								href='linkedin.com/in/pulokc '
								className='ml-3 text-blue-800 transition duration-500 ease-in-out hover:text-white hover:bg-brand-1 rounded-full p-2'
							>
								<svg
									fill='currentColor'
									stroke='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='0'
									className='w-5 h-5 '
									viewBox='0 0 24 24'
								>
									<path
										stroke='none'
										d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'
									></path>
									<circle cx='4' cy='4' r='2' stroke='none'></circle>
								</svg>
							</a>
						</span>
						<p className='text-black text-sm text-center sm:text-left'>
						&copy; {new Date().getFullYear()}
							<a
								href='https://www.facebook.com/pulok.chowdhury.priyo'
								rel='noopener noreferrer'
								className='text-brand-1 ml-1 '
								target='_blank'
							>
								Pulok Chowdhury
							</a>
						</p>
					</div>
				</div>
			</footer>
		</div>
  )
}
