// pages/index.tsx
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRankData } from '@/Providers/RankList';
import { useRouter } from 'next/navigation';
import { DeleteIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';


export default function Home() {
    const [keyword, setKeyword] = useState('');
    const {RankData, setRankData } = useRankData() ;

    const router=useRouter();
    const [sitename, setSitename] = useState('');
    
    const [device, setDevice] = useState('desktop');
    const [competitors, setCompetitors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [competitor,setCompetitor]=useState('')
    const addnewsite=()=>{

        setCompetitors([...competitors, competitor]);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            let apiUrl = "/api/scrape";

            // Create a URL object to add search parameters
let params = new URLSearchParams();
if (keyword) params.append("keyword", keyword);
if (sitename) params.append("sitename", sitename);
if (device) params.append("device", device);
competitors.forEach(competitor => {
    params.append("competitor", competitor);
});

// Append the search parameters to the API URL
apiUrl += `?${params.toString()}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setRankData(data);
            setLoading(false)
            router.push('/list')
            


        } catch (error) {
            console.error('Failed to scrape data', error);
        }
        setLoading(false);
    };

    return (
        <div className='w-screen flex items-center justify-center flex-col h-screen space-y-10 '>
                  <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
SEO Rank Checker</h2>
            <form onSubmit={handleSubmit} className='min-w-96'>
                <div>
                    <label>Keyword: </label>
                    <Input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}  />
                </div>
                <div>
                    <label>Site Name: </label>
                    <Input type="text" value={sitename} onChange={(e) => setSitename(e.target.value)}  />
                </div>
                <div>
                    <label>Device: </label>
                    <select value={device} onChange={(e) => setDevice(e.target.value)}>
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                    </select>
                </div>
                <div className=' mt-4 '>

<label>Competitors</label>
{competitors.map((competitor, index) => (
    <div key={index} className='flex items-center justify-between p-2 mb-4 bg-green-500 rounded-lg text-white'>
        {competitor}
        <TrashIcon onClick={() => setCompetitors(competitors.filter((_, i) => i !== index))} className='cursor-pointer'/>
        </div>
))}
                <div className='relative  '>

        <Input type="text" id="websiteInput" name="websiteInput" value={competitor} onChange={(e) => setCompetitor(e.target.value)} className=' pr-6'/>
        <PlusCircleIcon type="button" id="addButton" onClick={addnewsite} className='absolute bottom-0 right-0 border-none cursor-pointer bg-primary text-white h-full w-10 p-3 rounded-lg' />
    </div>
    </div>
                <Button className='mt-10' variant="default" type="submit">{loading ? <ClipLoader className='m-2' color='white' /> :null} Check Rank </Button> 
            </form>
          
        </div>
    );
}
