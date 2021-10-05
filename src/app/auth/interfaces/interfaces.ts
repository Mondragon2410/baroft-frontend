export interface AuthResponse{
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;
    role?: number;  
}

export interface User{
    uid: string;
    name: string;
    email: string; 
    role: number;  
    
} 

