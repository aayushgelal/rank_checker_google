// pages/api/scrape.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import * as XLSX from 'xlsx';
import path from 'path';
import { NextResponse } from 'next/server';

const mobileUserAgents = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)...',
    // Add more user agents if needed
];

const desktopUserAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
    // Add more user agents if needed
];
type urltype={
    url:string,
    heading:string|null,
    image:string|null
}



const cleanUrl = (url: string): string  => {
    const start = url.indexOf('https://');
    if (start === -1) return 'https://'+url;
    const end = url.indexOf('&ved', start);
    return end === -1 ? url.substring(start) : url.substring(start, end);
};

const rankCheck = (sitename: string, urls: urltype[], keyword: string, type: string) => {
    const site=cleanUrl(sitename)
    const data: any[] = [];
    urls.forEach((url, index) => {
    
         if (url.url.includes(site) && !url.url.includes("translate.google.com") && !url.url.includes("google.com/search")) {
            data.push({
                Keyword: keyword,
                Rank: index + 1,
                URLs: url,
                Date: new Date().toISOString().split('T')[0],
                Type: type
            });
        }
    });
    return data;
};

const getData = async (keyword: string, sitename: string, device: string,competitors: string[]) => {
    const googleUrl = `https://www.google.com/search?num=100&q=${encodeURIComponent(keyword)}`;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
        await page.goto(googleUrl, { waitUntil: 'networkidle2' });
        const data= await page.$$eval('#search  a',(anchors) =>{
            let urls:urltype[]=[]

            anchors.map(anchor => {
                const imageElement = anchor.querySelector('img.XNo5Ab') as HTMLImageElement;
                const imageSrc=imageElement?imageElement.src:null;
                const headingElement = anchor.querySelector("span.VuuXrf");
        
const heading = headingElement ? headingElement.textContent : null;
                urls.push({
                    url: anchor.href,
                    heading:heading,
                    image:imageSrc
                });
            });
        
            // Return the urls array
            return urls;
       
        });
                    console.log(data)

        await page.close();
        await browser.close();

        let results = rankCheck(sitename, data ,keyword, "My Site");

        competitors.forEach(competitor => {
            results = results.concat(rankCheck(competitor, data, keyword, "Competitor"));
        });

        return results.sort((a, b) => a.Rank - b.Rank);
    } catch (error) {
        console.error('Failed to retrieve data', error);
        await browser.close();
        return null;
    }
};

export async function GET(req: NextApiRequest, res: NextApiResponse){
    const url = new URL(req.url!)

    const keyword = url.searchParams.get("keyword")
    const sitename = url.searchParams.get("sitename")
    const device = url.searchParams.get("device")
    const competitors = url.searchParams.getAll("competitor")
    // const keyword="phone";
    // const sitename="www.flipkart.com"
    // const device="desktop"
    // const competitors=["www.amazon.in"]

    if (!keyword || !sitename || !device) {
        return res.status(400).json({ error: 'Missing query parameters' });
    }

    const data = await getData(keyword as string, sitename as string, device as string,competitors as string[]);
    if (data) {
     return  new Response(JSON.stringify(data), { status: 200 });

    } else {
      return   new Response('failed', { status: 500 });

    
        // res.status(500).json({ error: 'Failed to retrieve data' });
    }
};

