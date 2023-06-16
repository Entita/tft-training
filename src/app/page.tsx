'use client'
import React from 'react'
import { StartingPage } from '@/components/StartingPage'

export default function Home() {
  return (
    <>
      <StartingPage />
      <img style={{ position: 'absolute', top: 0, left: 0 }} src='refresh.png' alt='test' />
    </>
  )
}
