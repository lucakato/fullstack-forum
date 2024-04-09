import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
    try{
        await prisma.$connect();
    } catch (err) {
        return Error('Failed to connect to DB');
    }
}

// API to get posts
export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({message: 'Success', posts}, {status: 200});
    } catch (err) {
        return NextResponse.json({message: 'Error', err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
};

// API to upload posts
export const POST = async (req: Request, res: NextResponse) => {
    try {
        const {title, description} = await req.json();

        await main();
        const posts = await prisma.post.create({data: {title, description}});
        return NextResponse.json({message: 'Success', posts}, {status: 201});
    } catch (err) {
        return NextResponse.json({message: 'Error', err}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
};