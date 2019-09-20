import { ulid } from 'ulid';
import dayjs from 'dayjs';

export default function generateUlid() {
  const _ulid = ulid();
  const time = dayjs().format('YYYYMMDDHHmm');
  return _ulid + time;
}
