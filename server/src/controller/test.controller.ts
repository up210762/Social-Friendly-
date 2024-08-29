import {Request, Response} from 'express';
import { 
    testDeleteMethodService, 
    testGetMethodService, 
    testPostMethodService, 
    testPutMethodService
} from '../services/test';

export async function testGetMethod(req: Request, res: Response) {
    const token:string = req.headers['authorization']!;
    const resp = await testGetMethodService(token);
    console.log(resp)
    res.json(resp)
}

export async function testPostMethod(req: Request, res: Response) {
    const token:string = req.headers['authorization']!;
    const resp = await testPostMethodService(token)
    
    res.json(resp)
}

export async function testPutMethod(req: Request, res: Response) {
    const token:string = req.headers['authorization']!;
	const resp = await testPutMethodService(token)
    
    res.json(resp)
}

export async function testDeleteMethod(req: Request, res: Response) {
    const token:string = req.headers['authorization']!;
	const resp = await testDeleteMethodService(token)
    
    res.json(resp)
}