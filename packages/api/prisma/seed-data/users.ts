import { v4 as uuidv4 } from 'uuid';

export default [
  {
    id: '078d79f4-f4d9-4683-a564-f1d520ba37c1',
    username: 'elhan',
    password: '1234',
  },
  {
    id: '5784e22a-5034-4c3b-b491-953301401246',
    username: 'test',
    password: '1234',
  },
  ...Array.from({ length: 50 }, (_v, i) => ({
    id: uuidv4(),
    username: `user${i + 1}`,
    password: '1234',
  })),
];
