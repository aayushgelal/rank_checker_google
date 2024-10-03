"use client"
import { useRankData } from '@/Providers/RankList';
import React, { useContext } from 'react'
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card,CardContent,CardHeader,CardTitle,CardDescription,CardFooter } from '@/components/ui/card';
 
export default function ListPage() {
    const {RankData,setRankData } = useRankData() ;
    console.log(
        RankData
    )

  return (
  <div className='p-4 flex flex-wrap space-x-3 space-y-5 items-center'>
      {RankData?.map((item: any, index: number) => (
          <Card key={index} className='max-w-fit max-h-fit'>
  <CardHeader className='flex flex-row space-x-2 justify-between'>
    <div>
    <CardTitle>{item.Rank}</CardTitle>
    <CardDescription className=' font-bold'>{item.URLs.heading}</CardDescription>
    </div>
    {item.URLs.image && <Image src={item.URLs.image} className="rounded-full w-12" alt="image" width={100} height={100}/>}

  </CardHeader>
  <CardContent>
    <a href={item.URLs.url} target="_blank" rel="noopener noreferrer">{item.URLs.url}</a>
  </CardContent>
  <CardFooter className='  font-light text-sm'>
    <p>{item.Keyword}</p>
  </CardFooter>
</Card>

        
      ))}
      </div>
                  
                  
             
  );
}