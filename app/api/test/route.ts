import { NextResponse } from "next/server";

export async function GET(req:Request){
    console.log("Test hitted!!");
    return NextResponse.json({tom:"hello"});

}