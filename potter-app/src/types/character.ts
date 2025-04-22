export interface Character {
  id: string;
  name: string;
  image: string;
  house: string;
  actor: string;
  alive: boolean;
  wizard: boolean;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  patronus: string;
  wand: {
    wood: string;
    core: string;
    length: number | null;
  };
}

  