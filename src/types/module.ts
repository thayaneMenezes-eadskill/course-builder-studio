
export interface Module {
  id: string;
  title: string;
  content: string;
  order: number;
  createdAt: Date;
}

export type NewModule = Omit<Module, "id" | "createdAt">;
