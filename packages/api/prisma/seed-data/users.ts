import { v4 as uuidv4 } from 'uuid';

export default [
  {
    id: '078d79f4-f4d9-4683-a564-f1d520ba37c1',
    username: 'elhan',
    password: '1234',
  },
  {
    id: '5784e22a-5034-4c3b-b491-953301401246',
    username: 'user',
    password: '1234',
  },
  {
    id: 'db4b7f8f-0a97-4c17-8cbd-240702e05653',
    username: 'user2',
    password: '1234',
  },
  {
    id: '3635a175-f610-4624-bd26-4dc48864888c',
    username: 'user3',
    password: '1234',
  },
  {
    id: '131b0a38-21ee-4084-b614-72983d872a21',
    username: 'user4',
    password: '1234',
  },
  {
    id: '29d57406-9de2-4039-a9cb-10081039842d',
    username: 'user5',
    password: '1234',
  },
  ...Array.from({ length: 50 }, (_v, i) => ({
    id: uuidv4(),
    username: `user${i + 6}`,
    password: '1234',
  })),
];
