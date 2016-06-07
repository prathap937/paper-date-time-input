Polymer({
  is: 'paper-date-time-input',

  properties: {

    /**
     * The label for date input
     */
    labelDate: String,

    /**
     * The label for time input
     */
    labelTime: String,

    /**
     * Disables date selection
     */
    disableDate: {
      type: Boolean,
      value: false
    },

    /**
     * Disables time selection
     */
    disableTime: {
      type: Boolean,
      value: false
    },

    /**
     * The selected date (YYYY-MM-DD)
     */
    date: {
      type: Date,
      notify: true
    },

    /**
     * The format to apply when displaying in the input field
     */
    dateFormat: {
      type: String,
      value: 'YYYY-MM-DD'
    },

    /**
     * The selected time
     */
    time: {
      type: String,
      notify: true,
      observer: '_timeChange'
    },

    /**
     * The current 24-hour value (0-24)
     */
    hour: {
      type: Number,
      notify: true
    },

    /**
     * The current minute (0-59)
     */
    minute: {
      type: Number,
      notify: true
    },

    /**
     * The current second (0-59)
     */
    second: {
      type: Number,
      notify: true
    },

    /**
     * Flag to enable seconds selection
     */
    enableSeconds: {
      type: Boolean,
      observer: '_enableSecondsChange'
    },

    /**
     * Label for OK button in dialog box
     */
    okText: {
      type: String,
      value: 'OK'
    },

    /**
     * Label for Cancel button in dialog box
     */
    cancelText: {
      type: String,
      value: 'Cancel'
    }
  },

  _showDateDialog: function() {
    this.$.dateDialog.toggle();
  },

  _showTimeDialog: function() {
    this.$.timeDialog.toggle();
  },

  _formatDate: function(date) {
    if (!this._isDate(date)) { return null; }
    var calendar = this.$.datePicker.$.calendar;
    if (!this.disableTime) {
      this.set('time', calendar.dateFormat(date, 'hh:mm:ss a'));
    }
    return calendar.dateFormat(date, this.dateFormat);
  },

  /**
   * workaround for enableSeconds not reflecting to attribute in picker
   */
  _enableSecondsChange: function(enableSeconds) {
    this.$.timePicker.setAttribute('enable-seconds', enableSeconds);
  },

  _timeChange: function(time) {
    if (!time || this.disableDate || !this._isDate(this.date)) { return; }
    var me = this;
    me.debounce('setDateFields', function() {
      if (typeof this.hour === 'number') {
        me.date.setHours(me.hour);
      }
      if (typeof me.minute === 'number') {
        me.date.setMinutes(me.minute);
      }
      if (typeof me.second === 'number') {
        me.date.setSeconds(me.second);
      }
    }, 50);
  },

  _isDate: function(date) {
    return date && typeof (date).getDate === 'function';
  }
});
