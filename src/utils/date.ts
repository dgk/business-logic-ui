import dayjs from 'dayjs'
export const getFullDate = (d: string) =>
  dayjs(d).format('DD.MM.YYYY HH:mm:ss')
