export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}
