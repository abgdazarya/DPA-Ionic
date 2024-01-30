import Alarm from './alarm';
import CalendarAdd from './calendar-add';
import CalendarCheck from './calendar-check';
import CalendarClose from './calendar-close';
import CalendarDay from './calendar-day';
import CalendarEmpty from './calendar-empty';
import CalendarMonth from './calendar-month';
import CalendarRemove from './calendar-remove';
import CalendarWeek from './calendar-week';
import Clock from './clock';
import TimerAdd from './timer-add';
import TimerCheck from './timer-check';
import TimerClose from './timer-close';
import TimerEmpty from './timer-empty';
import TimerMinus from './timer-minus';
import Timer from './timer';

export const CalendarIconsModule: any = {
  alarm: Alarm(),
  calendar_add: CalendarAdd(),
  calendar_check: CalendarCheck(),
  calendar_close: CalendarClose(),
  calendar_day: CalendarDay(),
  calendar_empty: CalendarEmpty(),
  calendar_month: CalendarMonth(),
  calendar_remove: CalendarRemove(),
  calendar_week: CalendarWeek(),
  clock: Clock(),
  timer_add: TimerAdd(),
  timer_check: TimerCheck(),
  timer_close: TimerClose(),
  timer_empty: TimerEmpty(),
  timer_minus: TimerMinus(),
  timer: Timer(),
};
