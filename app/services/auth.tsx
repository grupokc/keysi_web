'use server';
import { cookies } from 'next/headers'
export const logOutAuth = async () => {
  
    await cookies().delete('titan_guid')
  }
export const logInAuth = async (guid:string) => {
await cookies().set({
    name: 'titan_guid',
    value: guid,
    httpOnly: true,
    path: '/',
})
}