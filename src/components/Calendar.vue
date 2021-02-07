<template lang="pug">
  .calendar
    date-picker(
      v-model="dateValue"
      ref="datePicker"
      valueType="format"
      :placeholder="placeholder"
      :update-value="openedDate"
      :format="dateFormat"
      :lang="langOptions"
      :name="name"
      :disabled-date="disabledDate"
      :confirm="true"
      :clearable="false"
      :append-to-body="false"
      :range="range"
      :open="isOpen"
      :range-separator="' - '"
      @keydown="onKeyDown"
      @input="onCalendarInput"
      @change="onCalendarInput"
      @focus="onFocus"
      @clear="onClear"
      @select="handleSelect"
    ).calendar-input
      template(v-slot:icon-calendar)
        span.calendar-icon(@click="iconClick" v-bind:class="{ 'calendar-icon_active' : isOpen }")

      template(v-slot:header)
        .calendar-header
          .calendar-col
            .calendar-label Месяц
            Select(
              v-if="monthSelect"
              @change="changeMonth"
              :options="monthSelect.options"
              :defaultValue="monthSelect.defaultValue"
              name="month"
            ).calendar-select
          .calendar-col
            .calendar-label Год
            Select(
              v-if="yearSelect"
              @change="changeYear"
              :options="yearSelect.options"
              :defaultValue="yearSelect.defaultValue"
              name="year"
            ).calendar-select

      template(v-if="range" v-slot:sidebar)
        .calendar-sidebar
          Radio(text="Выбрать дату" name="calendar" @change="radioChange('manual')" :checked="selectedFilter === 'manual'").calendar__radio
          Radio(text="Все время" name="calendar" @change="radioChange('all')" :checked="selectedFilter === 'all'").calendar__radio
          Radio(text="Прошлый год" name="calendar" @change="radioChange('pastYear')" :checked="selectedFilter === 'pastYear'").calendar__radio
          Radio(text="Этот квартал" name="calendar" @change="radioChange('quarter')" :checked="selectedFilter === 'quarter'").calendar__radio
          Radio(text="Прошлый квартал" name="calendar" @change="radioChange('pastQuarter')" :checked="selectedFilter === 'pastQuarter'").calendar__radio
          Radio(text="Этот месяц" name="calendar" @change="radioChange('month')" :checked="selectedFilter === 'month'").calendar__radio
          Radio(text="Прошлый месяц" name="calendar" @change="radioChange('pastMonth')" :checked="selectedFilter === 'pastMonth'").calendar__radio
          Radio(text="Эта неделя" name="calendar" @change="radioChange('week')" :checked="selectedFilter === 'week'").calendar__radio
          Radio(text="Прошлая неделя" name="calendar" @change="radioChange('pastWeek')" :checked="selectedFilter === 'pastWeek'").calendar__radio
      template(v-slot:footer)
        .calendar-footer
          .calendar-time(v-if="time")
            .calendar-col
              .calendar-label Время начала
              .input(:class="{'input_error': errors.has('timeFrom') && (fields.timeFrom && !fields.timeFrom.focused)}")
                input.input__input(
                  type="text"
                  placeholder="Укажите время"
                  @input="timeInputChange($event, 'timeFrom')"
                  @focus="timeInputFocus('timeFrom')"
                  @blur="timeInputBlur('timeFrom')"
                  name="timeFrom"
                  :value="timeFrom"
                  v-validate="{ regex: timeRegexp }"
                  v-mask="'##:##'"
                )
              .input__error-msg(v-if="errors.has('timeFrom') && (fields.timeFrom && !fields.timeFrom.focused)" v-show="errors.has('timeFrom')") {{ errors.first('timeFrom').replace('.', '') }}

            .calendar-col(v-if="range")
              .calendar-label Время конца
              .input(:class="{'input_error': errors.has('timeTo') && (fields.timeTo && !fields.timeTo.focused)}")
                input.input__input(
                  type="text"
                  placeholder="Укажите время"
                  name="timeTo"
                  @input="timeInputChange($event, 'timeTo')"
                  @focus="timeInputFocus('timeTo')"
                  @blur="timeInputBlur('timeTo')"
                  :value="timeTo"
                  v-validate="{ regex: timeRegexp }"
                  v-mask="'##:##'"
                )
              .input__error-msg(v-if="errors.has('timeTo') && (fields.timeTo && !fields.timeTo.focused) " v-show="errors.has('timeTo')") {{ errors.first('timeTo').replace('.', '') }}

          .calendar-buttons
            button(type="button" :disabled="isClearDisabled" @click="onClear").button.button_small.button_neutral Сбросить
            button(type="button" :disabled="isConfirmDisabled" @click="handleConfirm").button.button_small
              span Применить
</template>

<script>
  import DatePicker from 'vue2-datepicker';

  import 'vue2-datepicker/locale/ru';
  import 'vue2-datepicker/index.css';
  import Select from '@/components/forms/Select';

  import clickOutside from '../utils/clickOutside';
  import {
    format,
    parse,
    startOfYear,
    endOfYear,
    setYear,
    addWeeks,
    getMonth,
    addMonths,
    startOfMonth,
    endOfMonth,
    startOfQuarter,
    endOfQuarter,
    setQuarter,
    getQuarter,
    startOfISOWeek,
    lastDayOfISOWeek,
    isValid
  } from 'date-fns';
  import { ru } from 'date-fns/locale';
  import { mask } from 'vue-the-mask';
  import Radio from '@/components/forms/Radio';

  const DEFAULT_MIN_YEAR = 1980;
  const DEFAULT_TIME_FROM = '00:00';
  const DEFAULT_TIME_TO = '23:59';

  export default {
    name: 'Calendar',
    components: { Radio, Select, DatePicker },
    props: {
      defaultDate: Date,
      maxDate: Date,
      minDate: Date,
      value: [Array, String],
      name: String,
      placeholder: String,
      validate: Boolean,
      readonly: Boolean,
      disabledDate: Function,
      range: Boolean,
      time: Boolean
    },
    directives: { mask },
    watch: {
      defaultDate: function(newVal) {
        if (newVal) {
          this.openedDate = new Date(newVal);
          this.updateSelects();
        }
      },
      value: function(newVal) {
        if (newVal) {
          this.setOuterValue(newVal);
        }
      }
    },
    data() {
      return {
        yearChanged: null,
        openedDate: null,
        dateValue: null,
        innerValue: null,
        timeFrom: null,
        timeTo: null,
        isConfirmDisabled: true,
        isOpen: false,
        changedByKeyDown: false,
        timeRegexp: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        dateRegexp: /^(\d{1,2})(\/|\.|-)(\d{1,2})\2(\d{4})$/,
        isTouched: false,
        selectDisabled: false,
        selectedFilter: 'manual',
        lastSelectedFilter: 'manual',
        activeDate: '',
        cachedValue: null,
        langOptions: {
          formatLocale: {
            firstDayOfWeek: 1
          },
          monthBeforeYear: false
        },
        monthSelect: null,
        yearSelect: null
      };
    },
    methods: {
      radioChange(type) {
        this.$validator.reset();
        this.timeFrom = DEFAULT_TIME_FROM;
        this.timeTo = DEFAULT_TIME_TO;
        const now = new Date();
        let openedDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
        let targetDate = null;
        switch (type) {
          case 'all':
            targetDate = [this.getMinDate, this.getMaxDate];
            openedDate = new Date(Number(this.getMaxDate.getFullYear()), Number(this.getMaxDate.getMonth() + 1), Number(this.getMaxDate.getDay()));
            break;
          case 'year':
            const endOfYearDate = endOfYear(now);
            targetDate = [startOfYear(now), endOfYearDate];
            openedDate = new Date(Number(endOfYearDate.getFullYear()), Number(endOfYearDate.getMonth() + 1), Number(endOfYearDate.getDay()));
            break;
          case 'pastYear':
            const pastYearDate = endOfYear(setYear(now, now.getFullYear() - 1));
            targetDate = [startOfYear(setYear(now, now.getFullYear() - 1)), pastYearDate];
            openedDate = new Date(Number(pastYearDate.getFullYear()), Number(pastYearDate.getMonth() + 1), Number(pastYearDate.getDay()));
            break;
          case 'quarter':
            const quarterDate = endOfQuarter(now);
            targetDate = [startOfQuarter(now), quarterDate];
            openedDate = new Date(Number(quarterDate.getFullYear()), Number(quarterDate.getMonth() + 1), Number(quarterDate.getDay()));
            break;
          case 'pastQuarter':
            const pastQuarter = endOfQuarter(setQuarter(now, getQuarter(now) - 1));
            targetDate = [startOfQuarter(setQuarter(now, getQuarter(now) - 1)), pastQuarter];
            openedDate = new Date(Number(pastQuarter.getFullYear()), Number(pastQuarter.getMonth() + 1), Number(pastQuarter.getDay()));
            break;
          case 'month':
            const monthDate = endOfMonth(now);
            targetDate = [startOfMonth(now), monthDate];
            openedDate = new Date(Number(monthDate.getFullYear()), Number(monthDate.getMonth() + 1), Number(monthDate.getDay()));
            break;
          case 'pastMonth':
            const pastMonth = endOfMonth(addMonths(now, -1));
            targetDate = [startOfMonth(addMonths(now, -1)), pastMonth];
            openedDate = new Date(Number(pastMonth.getFullYear()), Number(pastMonth.getMonth() + 1), Number(pastMonth.getDay()));
            break;
          case 'week':
            const week = lastDayOfISOWeek(now);
            targetDate = [startOfISOWeek(now), week];
            openedDate = new Date(Number(week.getFullYear()), Number(week.getMonth() + 2), Number(week.getDay()));
            break;
          case 'pastWeek':
            const pastWeek = lastDayOfISOWeek(addWeeks(now, -1));
            targetDate = [startOfISOWeek(addWeeks(now, -1)), pastWeek];
            openedDate = new Date(Number(pastWeek.getFullYear()), Number(pastWeek.getMonth() + 2), Number(pastWeek.getDay()));
            break;
          default:
            this.innerValue = null;
        }
        this.selectedFilter = type;
        this.innerValue = targetDate;
        this.dateValue = type === 'manual' ? null : targetDate.map(dateItem => format(dateItem, this.getParsedFormat()));
        this.openedDate = openedDate;
        const selectMonth = (targetDate && targetDate[1]) ? getMonth(targetDate[1]) : getMonth(new Date(new Date().setMonth(now.getMonth())));
        const selectYear = targetDate && targetDate[1] && targetDate[1].getFullYear();
        this.updateSelects(selectMonth, selectYear);
        this.isTouched = true;
        this.validateCalendar();
      },
      getParsedFormat() {
        return this.dateFormat.replace('DD', 'dd').replace('YYYY', 'yyyy');
      },
      handleSelect(date) {
        this.selectedFilter = 'manual';
        this.innerValue = this.range ? date.map(dateItem => this.parseStringToDate(dateItem)) : this.parseStringToDate(date);
        if (this.range) {
          const activeDate = this.activeDate && new Date(this.activeDate);
          const newDate = activeDate && activeDate > this.innerValue[1] ? new Date(this.innerValue[0]) : new Date(this.innerValue[1]);
          this.openedDate = new Date(newDate.setMonth(newDate.getMonth() + 1));
        }
        this.isTouched = true;
        this.validateCalendar();
      },
      updateDateOnChange() {
        const openedDate = this.range ? this.dateValue[1] : this.dateValue;
        const parsedDate = this.parseStringToDate(openedDate);
        this.openedDate = this.range ? addMonths(parsedDate, 1) : parsedDate;
        const month = this.range ? getMonth(addMonths(parsedDate, 0)) : getMonth(parsedDate);
        const year = parsedDate.getFullYear();
        this.updateSelects(month, year);
      },
      onFocus() {
        const hasValue = this.range ? this.dateValue && this.dateValue.every(v => Boolean(v)) : Boolean(this.dateValue);
        if (hasValue) {
          this.updateDateOnChange();
        }
        this.openCalendar();
      },
      onKeyDown(event) {
        const value = event.target.value;
        const isInputValid = this.validateInput(value);
        const dateValue = this.range ? value.split(' - ') : value;
        this.changedByKeyDown = true;
        if (isInputValid) {
          this.dateValue = dateValue;
          if (this.time) {
            this.setTime(dateValue);
          }
          this.onCalendarInput();
          this.$validator.reset();
        }
      },
      getTimeArray(dateValue) {
        return this.range ? dateValue.map(d => d.split(', ')[1]) : dateValue.split(', ')[1];
      },
      setTime(dateValue) {
        const timeArray = this.getTimeArray(dateValue);
        if (timeArray) {
          this.timeFrom = timeArray[0];
          this.timeTo = timeArray[1];
        }
      },
      validateTime() {
        const timeFromValid = this.timeFrom && this.timeFrom.length ? this.timeRegexp.test(this.timeFrom) : true;
        const timeToValid = this.range ? (this.timeTo && this.timeTo.length ? this.timeRegexp.test(this.timeTo) : true) : true;
        return timeFromValid && timeToValid;
      },
      validateInput(value) {
        if (this.range) {
          const valueArray = value.split(' - ');
          return valueArray.every(v => this.validateDateItem(v));
        } else {
          return this.validateDateItem(value);
        }
      },
      validateDateItem(dateItem) {
        const date = dateItem.trim();
        const dateArray = this.time ? dateItem.split(', ') : [date];
        const isDateFull = this.dateRegexp.test(dateArray[0]);
        const isTimeFull = this.time ? this.timeRegexp.test(dateArray[1]) : true;
        const parsedDate = this.parseStringToDate(date);
        const isDateValid = isValid(parsedDate);
        return isDateFull && isDateValid && isTimeFull;
      },
      onCalendarInput() {
        const hasData = this.range ?
          (this.dateValue && this.dateValue.every(d => Boolean(d)))
          : this.dateValue;

        if (!hasData) {
          this.cachedValue = null;
          this.innerValue = null;
          this.selectedFilter = 'manual';
        }

        if (hasData) {
          this.updateDateOnChange();
          this.isTouched = true;
        }
        this.$emit('input', this.dateValue);
        this.validateCalendar();
      },
      changeYear(event) {
        let date = this.openedDate || new Date();
        const newYear = Number(event.value);
        if (this.range && !this.yearChanged) {
          this.yearChanged = true;
          date = new Date(date.setMonth(date.getMonth() + 1));
        }
        this.openedDate = new Date(date.setFullYear(newYear));
      },
      timeInputFocus(field) {
        this.fields[field].focused = true;
      },
      timeInputBlur(field) {
        this.fields[field].focused = false;
      },
      timeInputChange(event, field) {
        const value = event.target.value;
        this[field] = value;
        this.isTouched = true;
        this.validateCalendar();
      },
      changeMonth(event) {
        this.closeCalendar();
        const newMonth = Number(event.value);
        let currentDate = this.openedDate || new Date();
        let date = new Date(currentDate.setMonth(newMonth));
        if (this.range) {
          date = new Date(date.setMonth(date.getMonth() + 1));
        }
        this.openedDate = date;
        this.monthSelect.defaultValue = event.value;
        this.openCalendar();
      },
      iconClick() {
        this.openCalendar();
      },
      onClear() {
        this.innerValue = null;
        this.selectedFilter = this.lastSelectedFilter;
        this.timeFrom = null;
        this.timeTo = null;
        this.$validator.reset();
        if (this.cachedValue) {
          this.dateValue = null;
          const dateFrom = this.range ? this.cachedValue[0] : this.cachedValue;
          const dateTo = this.range ? this.cachedValue[1] : null;
          const actualDate = this.range ? dateTo : dateFrom;
          const date = this.parseStringToDate(actualDate);
          const month = date.getMonth();
          const year = date.getFullYear();
          if (this.time) {
            const timeFrom = dateFrom && dateFrom.split(', ')[1];
            const timeTo = dateTo && dateTo.split(', ')[1];
            if (timeFrom && this.timeRegexp.test(timeFrom)) {
              this.timeFrom = timeFrom;
            }
            if (timeTo && this.timeRegexp.test(timeTo)) {
              this.timeTo = timeTo;
            }
          }
          setTimeout(() => {
            this.dateValue = this.range ? [...this.cachedValue] : this.cachedValue;
            this.updateSelects(month, year);
          }, 0);
        } else {
          const calendar = this.$el.querySelector('.mx-table-date');
          const cells = calendar.querySelectorAll('.cell');
          cells.forEach(cell => {
            cell.classList.remove('active');
            cell.classList.remove('in-range');
          });
          this.dateValue = null;
        }
        this.isTouched = false;
        this.validateCalendar();
      },
      handleConfirm() {
        const targetDate = this.innerValue || (
          Array.isArray(this.dateValue) ?
            this.dateValue.map(d => this.parseStringToDate(d)) :
            this.parseStringToDate(this.dateValue)
        );
        const hasData = !!(targetDate) || (targetDate && targetDate.length);
        if (!hasData) {
          return;
        }
        let selectedDate;
        if (!this.timeFrom) {
          this.timeFrom = DEFAULT_TIME_FROM;
        }
        if (!this.timeTo) {
          this.timeTo = DEFAULT_TIME_TO;
        }
        const timeFrom = this.timeFrom;
        const timeTo = this.timeTo;
        if (this.range) {
          selectedDate =
            targetDate.map((date, index) => {
              let result = date;
              if (this.time) {
                const targetTime = index === 0 ? timeFrom : timeTo;
                const timeArray = targetTime.split(':');
                result.setHours(timeArray[0]);
                result.setMinutes(timeArray[1]);
              }
              return new Date(result);
            });
        } else {
          selectedDate = new Date(targetDate);
          if (this.time) {
            const timeArray = timeFrom.split(':');
            selectedDate.setHours(Number(timeArray[0]));
            selectedDate.setMinutes(Number(timeArray[1]));
          }
        }
        const parsedFormat = this.getParsedFormat();
        const month = String((this.range ? selectedDate[1].getMonth() - 1 : selectedDate.getMonth()) + 1);
        const year = String((this.range ? selectedDate[1].getFullYear() : selectedDate.getFullYear()));
        this.dateValue = this.range ? selectedDate.map(date => format(date, parsedFormat)) : format(selectedDate, parsedFormat);
        this.openedDate = this.range ? new Date(selectedDate[1].setMonth(selectedDate[1].getMonth() + 1)) : selectedDate;
        this.yearSelect.defaultValue = year;
        this.monthSelect.defaultValue = month;
        this.cachedValue = null;
        this.innerValue = null;
        this.lastSelectedFilter = this.selectedFilter;
        this.isTouched = false;
        this.changedByKeyDown = false;
        this.$emit('input', this.dateValue);
        this.closeCalendar();
        this.validateCalendar();
      },
      parseStringToDate(date) {
        const parsedFormat = this.getParsedFormat();
        return parse(date, parsedFormat, new Date());
      },
      getYears(start, end) {
        const res = [];
        for (let i = start; i <= end; i++) {
          res.push({
            text: String(i),
            val: String(i)
          });
        }
        return res;
      },
      getMonths(limit) {
        const months = [];
        for (let i = 0; i <= limit; i++) {
          months.push({
            text: ru.localize.month(i),
            val: String(i)
          });
        }
        return months;
      },
      updateSelects(month = null, year = null) {
        const date = this.openedDate || new Date();
        const startYear = DEFAULT_MIN_YEAR;
        const defaultMonth = (month !== null && month >= 0) ? month : date.getMonth();
        const defaultYear = year || date.getFullYear();
        const maxYear = this.maxDate ? this.maxDate.getFullYear() : defaultYear;
        if (this.yearSelect) {
          this.yearSelect.defaultValue = null;
        }
        setTimeout(() => {
          this.yearSelect = {
            defaultValue: String(defaultYear),
            options: this.getYears(startYear, maxYear)
          };
        }, 0);
        this.monthSelect = {
          defaultValue: String(defaultMonth),
          options: this.getMonths(11)
        };
      },
      openCalendar() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        if (this.range) {
          this.$el.addEventListener('mousemove', this.hoverHighlight);
          this.$el.addEventListener('click', this.setActiveDate);
        }
      },
      closeCalendar() {
        this.isOpen = false;
        if (this.range) {
          this.$el.removeEventListener('mousemove', this.hoverHighlight);
          this.$el.removeEventListener('click', this.setActiveDate);
        }
      },
      removeHoveredClass() {
        const hovered = this.$el.querySelector('.hovered');
        const cellsInRange = this.$el.querySelectorAll('.in-between');
        cellsInRange.forEach(el => el.classList.remove('in-between'));
        if (hovered) {
          hovered.classList.remove('hovered');
        }
      },
      setActiveDate(e) {
        const target = e.target;
        const isCell = target.classList.contains('cell');
        const isInside = target.closest('.cell');
        const cellEl = isCell ? target : isInside;
        if (cellEl) {
          if (!this.activeDate) {
            this.activeDate = cellEl.title;
          } else {
            this.activeDate = '';
          }
        }
      },
      hoverHighlight(e) {
        if (!this.activeDate) {
          return;
        }
        const target = e.target;
        const isCell = target.classList.contains('cell');
        const isInside = target.closest('.cell');
        const cellEl = isCell ? target : isInside;
        if (cellEl) {
          if (cellEl.classList.contains('active')) {
            return;
          }
          const hoveredDate = new Date(cellEl.title);
          const activeDate = new Date(this.activeDate);

          const hasHoverClass = cellEl.classList.contains('hovered');
          if (!hasHoverClass) {
            cellEl.classList.add('hovered');
          }

          const table = cellEl.closest('table');
          const rows = Array.from(table.querySelectorAll('.mx-table-date .mx-date-row'));
          const cellsBetween = rows.map(row => Array.from(row.children)).flat();
          let cellsToHover = [];
          const activeIndex = cellsBetween.findIndex(el => el.classList.contains('active'));
          const hoveredIndex = cellsBetween.findIndex(el => el.classList.contains('hovered'));
          if (activeIndex >= 0 && hoveredIndex) {
            if (hoveredIndex > activeIndex) {
              cellsToHover = cellsBetween.slice(activeIndex + 1, hoveredIndex);
            }
            if (hoveredIndex < activeIndex) {
              cellsToHover = cellsBetween.slice(hoveredIndex + 1, activeIndex);
            }
          } else if (hoveredIndex) {
            if (hoveredDate > activeDate) {
              cellsToHover = cellsBetween.slice(0, hoveredIndex);
            } else {
              cellsToHover = cellsBetween.slice(hoveredIndex + 1, cellsBetween.length);
            }
          }
          if (cellsToHover.length) {
            cellsToHover.forEach(cell => cell.classList.add('in-between'));
          }
        }
        if (!cellEl) {
          this.removeHoveredClass();
        }
      },
      validateCalendar() {
        let isConfirmDisabled;
        if (this.time) {
          const isTimeValid = this.validateTime();
          if (isTimeValid) {
            if (this.dateValue) {
              isConfirmDisabled = !this.isTouched;
            } else {
              isConfirmDisabled = !(this.innerValue && this.isTouched);
            }
          } else {
            isConfirmDisabled = true;
          }
        } else {
          isConfirmDisabled = !(this.innerValue && this.isTouched);
        }
        this.isConfirmDisabled = isConfirmDisabled;
      },
      setOuterValue(value) {
        const openedDate = this.range ? value[1] : value;
        this.openedDate = addMonths(this.parseStringToDate(openedDate), 1);
        this.dateValue =
          this.range ? value.map(v => v.split(' ').join(', ')) :
            this.time ? value.split(' ').join(', ') : value;
        if (!this.range && this.time) {
          this.timeFrom = value.split(' ')[1];
        }
        if (!this.changedByKeyDown) {
          this.cachedValue = this.range ? [...this.dateValue] : this.dateValue;
        }
        this.updateDateOnChange();
      }
    },
    computed: {
      dateFormat() {
        return this.time ? 'DD.MM.YYYY, HH:mm' : 'DD-MM-YYYY';
      },
      getMaxDate() {
        return this.maxDate || this.disabledDate() || new Date();
      },
      getMinDate() {
        return new Date(DEFAULT_MIN_YEAR, 0, 1);
      },
      isFormDirty() {
        return Object.keys(this.fields).some(key => this.fields[key].dirty);
      },
      isFormValid() {
        return Object.keys(this.fields).every(key => {
          if (this.fields[key].dirty) {
            return this.fields[key].valid;
          }
          if (!this.fields[key].dirty) {
            return true;
          }
        });
      },
      isClearDisabled() {
        return !this.isTouched;
      }
    },
    mounted() {
      if (this.value) {
        this.setOuterValue(this.value);
      }
      clickOutside(this.$el,
        () => {
          this.closeCalendar();
          if (!this.dateValue) {
            return;
          }
          const rangedCached = (this.cachedValue && this.cachedValue.every && this.cachedValue.every(d => Boolean(d)));
          const hasCached = Boolean(this.cachedValue);
          const rangedValue =
            (this.dateValue.every && this.dateValue.every(d => Boolean(d))) || rangedCached;
          const hasValue = this.range ? rangedValue : (Boolean(this.dateValue) || hasCached);
          if (hasCached || rangedCached) {
            this.isTouched = false;
            this.$validator.reset();
            this.validateCalendar();
            this.setTime(this.cachedValue);
          }
          if (!hasValue) {
            return;
          }
          if (this.range) {
            this.selectedFilter = this.lastSelectedFilter;
            this.dateValue = this.cachedValue || null;
            this.openedDate = this.dateValue ? this.parseStringToDate(this.dateValue[1]) : new Date();
          } else {
            this.openedDate = this.parseStringToDate(this.dateValue);
          }
          this.innerValue = null;
        });
      this.updateSelects();
    }
  };
</script>

<style lang="scss">

  .calendar {
    position: relative;
    width: 100%;

    .input__error-msg {
      text-align: left;
    }
  }

  .mx-datepicker-btn-confirm {
    display: none;
  }

  .mx-calendar-header {
    display: none;
  }

  .mx-datepicker-footer {
    .calendar-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .mx-btn, .button {
        font-size: 10px;
        width: 125px;
        border-radius: 30px;
        height: 30px;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }

  .mx-datepicker-popup {
    display: flex;
  }

  .mx-table-date .cell.not-current-month {
    display: none;
  }

  .mx-calendar {
    width: 332px;
    padding: 6px 26px 18px;

    .cell.today.active {
      background: #4A6C87 !important;
      border-color: #4A6C87 !important;
    }

    .cell.in-between {
      background: #F1F2F7;
    }
  }

  .mx-calendar-content .mx-table-date .cell.today {
    border: 1px solid #81A6C3;
  }

  .mx-range-wrapper .mx-calendar-content .cell.in-range.today {
    background: #4A6C87 !important;
    border-color: #4A6C87 !important;
  }

  .mx-table-date th {
    font-family: $openSans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    text-transform: capitalize;
    text-align: center;

    color: #666666;
  }

  .mx-table-date tbody td {
    font-family: $openSans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    text-align: center;

    color: #81A6C3;
  }

  .mx-calendar-content {
    height: auto;
  }

  .mx-calendar-content .mx-table-date .cell {
    border-radius: 50%;
    border: 1px solid transparent;

    &:hover {
      color: #81A6C3;
      background: #F1F2F7;
    }
  }

  .mx-calendar-content .cell.disabled {
    background: none;
  }

  .mx-calendar-content .cell.active {
    background: #81A6C3;
    border-color: #81A6C3;
    color: white;
  }

  .calendar-header,
  .calendar-time {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .calendar-time {
    margin-bottom: 30px;
  }

  .calendar-col {
    width: 46%;
  }

  .calendar-label {
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 19px;

    color: #888888;
    text-align: left;
  }

  .mx-datepicker-header {
    padding: 26px 32px 11px;
    border-bottom: none;

  }

  .select.calendar-select {
    height: 30px;

    .option,
    .select__wrapper {
      text-transform: capitalize;
    }
  }

  .mx-table-date td,
  .mx-table-date th {
    height: 40px;
  }

  .mx-table-date {
    tbody {
      display: flex;
      flex-direction: column;
      width: 280px;
    }

    .mx-date-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        margin: 5px;
        height: 30px;
      }

      .cell.not-current-month {
        display: none;
      }

      &:nth-last-child(2),
      &:last-child {
        justify-content: flex-start;
      }
    }
  }

  .mx-datepicker-main {
    border: 1px solid #81A6C3;
    border-radius: 3px;
    box-shadow: none;
  }

  .mx-datepicker-footer {
    padding: 7px 31px 29px;
    border-top: none;
  }

  .mx-input-wrapper .mx-icon-clear {
    color: #81a7c3;
  }

  .mx-table-date .today {
    color: #81a7c3;
  }

  .mx-range-wrapper {
    .mx-calendar:last-child {
      display: none;
    }

    .mx-calendar-content .cell.active,
    .mx-calendar-content .cell.in-range {
      background: #81A6C3;
      border-color: #81A6C3;
      color: white;
    }
  }

  .mx-datepicker-sidebar {
    width: 207px;
    padding: 29px 20px 10px 30px;
  }

  .mx-datepicker-sidebar + .mx-datepicker-content {
    width: 331px;
    margin: 0;
  }

  .mx-datepicker .calendar-time input {
    height: 30px;
    box-sizing: border-box;
    font-size: 14px;
    padding-right: 7px;
  }

  .calendar__radio {
    margin-bottom: 17px;
  }

  .calendar-icon {
    display: block;
    width: 15px;
    height: 16px;
    cursor: pointer;
    background: url(../assets/images/icon_calendar.svg) no-repeat center;

    &_active,
    &:hover {
      background: url(../assets/images/icon_calendar-active.svg) no-repeat center;
    }
  }
</style>
