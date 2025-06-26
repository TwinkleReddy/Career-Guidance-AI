import React from 'react'
import { SignedOut, SignInButton, SignUpButton, UserButton, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu'
import { checkUser } from '@/lib/checkUser'
const Header = async () => {
    await checkUser();
    return (
        <header className='top-0 w-full gradient-background backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
              {/* Floating Orbs */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
              
              {/* Moving Particles */}
              <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-32 right-20 w-3 h-3 bg-purple-400/40 rounded-full animate-bounce delay-700"></div>
              <div className="absolute bottom-20 left-20 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce delay-1100"></div>
              <div className="absolute bottom-40 right-40 w-1 h-1 bg-pink-400/50 rounded-full animate-bounce delay-1500"></div>
              
              {/* Gradient Waves */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-500/5 to-transparent animate-pulse delay-1000"></div>
            </div>
            <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
                <Link href='/'>
                    <Image src='/logo (3).png' width={220} height={50} alt='bumblebee logo' className='object-contain' />
                </Link>
                <div className='flex items-center space-x-2 md:space-x-4'>
                    <SignedIn>
                        <Link href='/dashboard'>
                            <Button variant='outline'>
                                <LayoutDashboard className='h-4 w-4' />
                                <span className='hidden md:block'>Industry Insights</span>

                            </Button>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <StarsIcon className='h-4 w-4' />
                                    <span className='hidden md:block'>Growth Tools</span>
                                    <ChevronDown className='h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href={'/resume'} className='flex items-center gap-2'>
                                        <FileText className='h-4 w-4' />
                                        <span>Build Resume</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem><Link href={'/ai-cover-letter'} className='flex items-center gap-2'>
                                    <PenBox className='h-4 w-4' />
                                    Cover Letter
                                </Link></DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/interview'} className='flex items-center gap-2'>
                                        <GraduationCap className='h-4 w-4' />
                                        Interview Prep
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <Button variant='outline'>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton 
                        appearance={{
                            elements: {
                                avatarBox: "w-10 h-10",
                                userPreviewMainIdentifier: 'font-semibold',
                                userButtonPopoverCard: 'shadow-xl'

                            }
                        }}
                        afterSignOutUrl='/'
                        />
                    </SignedIn>
                </div>

            </nav>

        </header>
    )
}

export default Header
