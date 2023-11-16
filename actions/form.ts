"use server"

import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser"
import { formSchema, formSchemaType } from "@/lib/types";


// creating custom error 

class UserNotFoundErr extends Error{}

// provides Form status of a form

export async function GetFormStats() {

    const user = await getCurrentUser();
    if(!user){
        throw new UserNotFoundErr();
    }

    const stats = await db.form.aggregate({
        where:{
            userId:user.id
        },
        _sum:{
            visits:true,
            submissions:true
        }
    });

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if(visits > 0){
       submissionRate = (submissions /visits) * 100; 
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,submissions,submissionRate,bounceRate
    }
    
}

// handle creating of the form

export async function CreateForm(data:formSchemaType) {

    // validate the data on server
    const validation = formSchema.safeParse(data);

    if(!validation.success){
          throw new Error("form not valid");
    }

    const user = await getCurrentUser();

    if(!user){
       throw new  UserNotFoundErr(); 
    }

    const {name,description} = data;

    const form = await db.form.create({
        data:{
            userId:user.id,
            name,
            description
        }
    });
    
    if(!form){
        throw new Error("something went wrong!!");
    }

    return form.id;
    
}

// Provide all the form which is avaiable to the user.

export async function GetForms() {

    const user = await getCurrentUser();

    if(!user){
        throw new  UserNotFoundErr();
    }

    return await db.form.findMany({
        where:{
            userId:user.id
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    
}

// Provide form based on Id

export async function GetFormById(id:number){
    const user = await getCurrentUser();
    if(!user){
        throw new  UserNotFoundErr();
    }
    
    if(Number.isNaN(id)){
        throw new Error("Id is not found");
    }
    return await db.form.findUnique({
        where:{
            id,
            userId:user.id
        }
    
    })
}

export async function UpdateFormContent(id:number,jsonContent:string){
    const user = await getCurrentUser();
    if(!user){
        throw new  UserNotFoundErr();
    }
    return await db.form.update({
        where:{
            userId:user.id,
            id,
        },
        data:{
            content:jsonContent
        }
    })
}

// handle publish of the form

export async function publishForm(id:number){
    const user = await getCurrentUser();
    if(!user){
        throw new  UserNotFoundErr();
    }
    return await db.form.update({
        data:{
            published:true,
        },
        where:{
            userId:user.id,
            id
        }
    })
}

export async function GetFormContentByUrl(formUrl:string){
    return await db.form.update({
        select:{
            content:true,
        },
        where:{
            shareURL:formUrl
        },
        data:{
            visits:{
                  increment:1
            }
        }
    })
}

//handling submit form
export async function SubmitForm(formUrl:string,content:string){
    return await db.form.update({
        data:{
            submissions:{
                increment:1,
            },
            formsubmissions:{
                create:{
                    content
                }
            }
        },
        where:{
            shareURL:formUrl,
            published:true
        }

    })
}

// handle Form Submission
export async function GetFormWithSubmissions(id:number){
    const user = await getCurrentUser();
    if(!user){
        throw new UserNotFoundErr();
    }
    return await db.form.findUnique({
        where:{
            id,
            userId:user.id
        },
        include:{
            formsubmissions:true
        }
    })
}