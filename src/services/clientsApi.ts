import api from './api';
import type { Client, CreateClientPayload, CreateAccountResponse } from '@/types/Client';

export async function fetchClients(): Promise<Client[]> {
  const res = await api.get<{ items: Client[] }>('/admin/customers');
  return res.data.items;
}

export async function createClient(payload: CreateClientPayload): Promise<Client> {
  const res = await api.post<Client>('/admin/customers', payload);
  return res.data;
}

export async function updateClient(id: string, payload: Partial<CreateClientPayload>): Promise<Client> {
  const res = await api.patch<Client>(`/admin/customers/${id}`, payload);
  return res.data;
}

export async function createAccountForClient(id: string): Promise<CreateAccountResponse> {
  const res = await api.post<CreateAccountResponse>(`/admin/customers/${id}/account`);
  return res.data;
}