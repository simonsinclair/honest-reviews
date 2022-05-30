import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Props = {
  date: Date;
};

export const TimeFromNow = ({ date }: Props) => {
  return <time dateTime={date.toString()}>{dayjs(date).fromNow()}</time>;
};
