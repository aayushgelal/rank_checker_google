import { redirect } from 'next/navigation';
import { NextApiRequest, NextApiResponse } from 'next';

import React from 'react'

export default function page(req:NextApiRequest, res:NextApiResponse) {
  return redirect('/home');
}
