export type SceneId =
  | 'secret-gate'
  | 'blooming-garden'
  | 'our-memories'
  | 'love-letter'
  | 'grand-reveal'
  | 'wishes-sky'
  | 'final-message';

export interface SceneMeta {
  id: SceneId;
  index: number;
  numberStr: string;
  title: string;
  subtitle: string;
  dotLabel: string;
}

export const SCENES: SceneMeta[] = [
  {
    id: 'secret-gate',
    index: 0,
    numberStr: '01',
    title: 'Secret Gate',
    subtitle: 'Chạm Vào Trái Tim',
    dotLabel: 'Cổng Bí Mật'
  },
  {
    id: 'blooming-garden',
    index: 1,
    numberStr: '02',
    title: 'Blooming Garden',
    subtitle: 'Vườn Hoa Hé Nở',
    dotLabel: 'Đóa Hồng Tình Yêu'
  },
  {
    id: 'our-memories',
    index: 2,
    numberStr: '03',
    title: 'Our Memories',
    subtitle: 'Những Giây Phút Đáng Nhớ',
    dotLabel: 'Kỷ Niệm'
  },
  {
    id: 'love-letter',
    index: 3,
    numberStr: '04',
    title: 'The Love Letter',
    subtitle: 'Bức Thư Tình Gửi Em',
    dotLabel: 'Thư Tình'
  },
  {
    id: 'grand-reveal',
    index: 4,
    numberStr: '05',
    title: '20.10 Grand Reveal',
    subtitle: 'Màn Chúc Mừng 20.10',
    dotLabel: 'Chúc Mừng 20.10'
  },
  {
    id: 'wishes-sky',
    index: 5,
    numberStr: '06',
    title: 'A Sky Full of Wishes',
    subtitle: 'Bầu Trời Điều Ước',
    dotLabel: 'Điều Ước'
  },
  {
    id: 'final-message',
    index: 6,
    numberStr: '07',
    title: 'Just for You',
    subtitle: 'Mãi Yêu Thương Em',
    dotLabel: 'Lời Kết'
  }
];

export const getSceneByIndex = (index: number): SceneMeta => {
  const safeIndex = Math.max(0, Math.min(index, SCENES.length - 1));
  return SCENES[safeIndex];
};

export const getSceneById = (id: SceneId): SceneMeta => {
  return SCENES.find((s) => s.id === id) || SCENES[0];
};
