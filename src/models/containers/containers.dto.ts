export interface ContainerDto {
  name: string;
  volume: number;
  _id?: string;
  icon: string;
  description: string;
  takenSpace: number;
}

export interface AssignItemsDto {
  _id: string;
  type: string;
}
