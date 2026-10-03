import {NextResponse} from 'next/server';
export function GET(){return NextResponse.json({error:'Import has moved to the offline catalog build process.'},{status:410});}
