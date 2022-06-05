import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Props = {
  date: Date;
};

export const TimeFromNow = ({ date }: Props) => {
  const dateTimeString = date.toString();
  return (
    <time dateTime={dateTimeString} title={dateTimeString}>
      {dayjs(date).fromNow()}
    </time>
  );
};
