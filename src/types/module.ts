
export interface Module {
  id: string;
  title: string;
  content: any;
  order: number;
  createdAt: Date;
}

export type NewModule = Omit<Module, "id" | "createdAt">;
