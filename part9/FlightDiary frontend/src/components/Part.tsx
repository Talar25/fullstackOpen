import { Diary } from '../types';

export const Part = ({ diary }: { diary: Diary }) => {
  return (
    <div>
      <h4>{diary.date}</h4>
      <p>visibility: {diary.visibilit}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};
