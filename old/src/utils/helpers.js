/** @flow **/
import m from 'moment'

export const getFullDate = (date: string) => m(date).format('DD.MM.YYYY HH:mm:ss')

export const getDateDiff = ({ start, finish }: { start: string, finish: string }): number => (
  m(finish).diff(m(start))
)