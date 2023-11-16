import { Diary } from '../types';
import { Part } from './Part';

export const Content = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h2>Diary entriess</h2>
      {diaries.map((diary) => (
        <Part key={diary.id} diary={diary} />
      ))}
    </div>
  );
};
