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
  <CardHeader>
    <CardTitle>{item.Rank}</CardTitle>
    <CardDescription className=' font-bold'>{item.URLs.heading}</CardDescription>
  </CardHeader>
  <CardContent>
   {item.URLs.image && <Image src={item.URLs.image} alt="image" width={100} height={100}/>}
    <p>{item.URLs.url}</p>
  </CardContent>
  <CardFooter className='  font-light text-sm'>
    <p>{item.Keyword}</p>
  </CardFooter>
</Card>

        
      ))}
      </div>
                  
                  
             
  );
}